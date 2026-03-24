# Fastika Store Locator 🍫

تطبيق ويب لعرض نقاط بيع منتجات شوكولاتة فستكا مع ميزة تحديد الموقع الجغرافي لترتيب المتاجر حسب الأقرب.

## 🚀 التقنيات المستخدمة

- **Next.js 16.1.6** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS v4** - Styling
- **Supabase** - Database & Authentication
- **Geolib** - Distance Calculations
- **React Hook Form + Zod** - Form Validation
- **Jose + Bcryptjs** - JWT Authentication

## 📁 هيكل المشروع

```
store-locator/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # الواجهة الأمامية للمستخدمين
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (admin)/             # لوحة التحكم للمسؤولين
│   │   │   ├── layout.tsx
│   │   │   ├── admin.css
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   └── stores/
│   │   ├── layout.tsx           # Root Layout (RTL)
│   │   └── globals.css
│   ├── components/
│   │   ├── frontend/            # Header, Footer, StoreCard, etc.
│   │   └── admin/               # AdminNav, StoreForm, StoreTable
│   ├── lib/
│   │   ├── supabase/            # Supabase Client
│   │   ├── auth/                # JWT Authentication
│   │   ├── stores/              # Database Queries & Mutations
│   │   └── geolocation/         # Distance Calculations
│   ├── hooks/frontend/          # useUserLocation, useStores
│   ├── types/                   # TypeScript Types
│   └── middleware.ts            # Route Protection
├── supabase/migrations/
│   └── 001_initial_schema.sql   # Database Schema
└── .env.local                   # Environment Variables
```

## ⚙️ الإعداد والتشغيل

### 1. استنساخ المشروع

```bash
cd E:\Fastika_website1\store-locator
```

### 2. تثبيت الحزم

```bash
npm install
```

### 3. إعداد المتغيرات البيئية

أنشئ ملف `.env.local` في جذر المشروع:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret_key_min_32_chars
```

### 4. إعداد قاعدة البيانات

1. افتح [Supabase Dashboard](https://supabase.com/dashboard)
2. اذهب إلى **SQL Editor**
3. انسخ محتوى `supabase/migrations/001_initial_schema.sql`
4. نفذ الـ SQL

### 5. تشغيل التطبيق

```bash
# Development
npm run dev

# Production Build
npm run build
npm run start
```

## 🔗 الروابط

| الصفحة | الرابط |
|--------|--------|
| الواجهة الأمامية | http://localhost:3000 |
| تسجيل الدخول | http://localhost:3000/admin/login |
| لوحة التحكم | http://localhost:3000/admin/dashboard |
| إدارة نقاط البيع | http://localhost:3000/admin/stores |

## 🔐 بيانات الدخول الافتراضية

```
البريد الإلكتروني: admin@fastika.com
كلمة المرور: admin123
```

⚠️ **مهم:** قم بتغيير كلمة المرور بعد أول تسجيل دخول!

## 📱 المميزات

### الواجهة الأمامية
- ✅ عرض جميع نقاط البيع النشطة
- ✅ تحديد الموقع الجغرافي للمستخدم
- ✅ ترتيب المتاجر حسب الأقرب
- ✅ عرض المسافة بالكيلومتر
- ✅ روابط مباشرة لخرائط Google
- ✅ تصميم متجاوب (Responsive)
- ✅ دعم RTL للغة العربية

### لوحة التحكم
- ✅ تسجيل دخول آمن (JWT)
- ✅ عرض إحصائيات سريعة
- ✅ إضافة نقاط بيع جديدة
- ✅ تعديل نقاط البيع
- ✅ حذف نقاط البيع
- ✅ تفعيل/تعطيل نقاط البيع
- ✅ حماية المسارات (Middleware)

## 🗄️ قاعدة البيانات

### جدول stores
| العمود | النوع | الوصف |
|--------|-------|-------|
| id | UUID | المعرف الفريد |
| name | TEXT | اسم المتجر |
| address | TEXT | العنوان |
| latitude | DECIMAL | خط العرض |
| longitude | DECIMAL | خط الطول |
| phone | TEXT | رقم الهاتف (اختياري) |
| google_map_url | TEXT | رابط خرائط Google |
| is_active | BOOLEAN | حالة التفعيل |
| created_at | TIMESTAMPTZ | تاريخ الإنشاء |
| updated_at | TIMESTAMPTZ | تاريخ التحديث |

### جدول admins
| العمود | النوع | الوصف |
|--------|-------|-------|
| id | UUID | المعرف الفريد |
| email | TEXT | البريد الإلكتروني |
| password_hash | TEXT | كلمة المرور المشفرة |
| name | TEXT | الاسم |
| created_at | TIMESTAMPTZ | تاريخ الإنشاء |
| last_login | TIMESTAMPTZ | آخر تسجيل دخول |

## 🔒 الأمان

- **Row Level Security (RLS)**: مفعل على جميع الجداول
- **Service Role**: يُستخدم للعمليات الإدارية فقط
- **JWT Authentication**: للتحقق من هوية المسؤولين
- **Bcrypt Hashing**: لتشفير كلمات المرور
- **Middleware Protection**: لحماية مسارات Admin

## 🛠️ الأوامر المتاحة

```bash
npm run dev      # تشغيل بيئة التطوير
npm run build    # بناء المشروع للإنتاج
npm run start    # تشغيل الإنتاج
npm run lint     # فحص الأكواد
```

## 📝 ملاحظات تقنية

1. **Tailwind CSS v4**: يستخدم الصيغة الجديدة `@import "tailwindcss"`
2. **Next.js 16**: يظهر تحذير عن middleware (يعمل بشكل صحيح)
3. **React 19**: أحدث إصدار مع React Compiler

## 🤝 المساهمة

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى الـ branch (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## 📄 الرخصة

هذا المشروع مخصص لـ Fastika - جميع الحقوق محفوظة.

---

**Developed with ❤️ for Fastika Chocolate**
