'use server';

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { createAdminClient } from '@/shared/api/supabase/server';
import type { Admin, AdminJWTPayload, AdminSession } from '@/entities/admin/model';
import type { Database } from '@/shared/types/database';

type AdminRow = Database['public']['Tables']['admins']['Row'];

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-secret-key-change-in-production'
);

const COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; admin?: Admin }> {
  try {
    const supabase = await createAdminClient();
    
    // Fetch admin by email
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (error || !data) {
      return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
    }

    const admin = data as AdminRow;

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    
    if (!isValidPassword) {
      return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
    }

    // Update last login - using type assertion due to RLS policy
    await (supabase as unknown as { from: (table: string) => { update: (data: Record<string, unknown>) => { eq: (col: string, val: string) => Promise<unknown> } } })
      .from('admins')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id);

    // Create JWT token
    const expiresAt = Date.now() + SESSION_DURATION;
    const token = await new SignJWT({
      adminId: admin.id,
      email: admin.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(JWT_SECRET);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(expiresAt),
      path: '/',
    });

    return {
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        created_at: admin.created_at,
        last_login: admin.last_login,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'حدث خطأ أثناء تسجيل الدخول' };
  }
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const adminPayload = payload as unknown as AdminJWTPayload;

    // Fetch fresh admin data
    const supabase = await createAdminClient();
    const { data: admin } = await supabase
      .from('admins')
      .select('id, email, name, created_at, last_login')
      .eq('id', adminPayload.adminId)
      .single();

    if (!admin) {
      return null;
    }

    return {
      admin,
      token,
      expiresAt: adminPayload.exp * 1000,
    };
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  return session !== null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
