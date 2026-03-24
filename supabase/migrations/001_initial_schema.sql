-- Fastika Store Locator - Initial Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- Table: stores (نقاط البيع)
-- =============================================
CREATE TABLE IF NOT EXISTS public.stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone TEXT,
  google_map_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Table: admins (المسؤولين)
-- =============================================
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- =============================================
-- Indexes (الفهارس)
-- =============================================
CREATE INDEX IF NOT EXISTS idx_stores_location ON public.stores(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_stores_active ON public.stores(is_active);
CREATE INDEX IF NOT EXISTS idx_admins_email ON public.admins(email);

-- =============================================
-- Function: Update updated_at automatically
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- Trigger: Auto-update updated_at on stores
-- =============================================
DROP TRIGGER IF EXISTS update_stores_updated_at ON public.stores;
CREATE TRIGGER update_stores_updated_at
  BEFORE UPDATE ON public.stores
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Enable RLS on stores
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active stores
DROP POLICY IF EXISTS "Active stores are viewable by everyone" ON public.stores;
CREATE POLICY "Active stores are viewable by everyone"
  ON public.stores FOR SELECT
  USING (is_active = true);

-- Policy: Service role can do everything (for admin operations)
DROP POLICY IF EXISTS "Service role has full access to stores" ON public.stores;
CREATE POLICY "Service role has full access to stores"
  ON public.stores FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on admins
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can access admins table
DROP POLICY IF EXISTS "Service role has full access to admins" ON public.admins;
CREATE POLICY "Service role has full access to admins"
  ON public.admins FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =============================================
-- Insert default admin (change password after first login!)
-- Password: admin123 (hashed with bcrypt)
-- =============================================
INSERT INTO public.admins (email, password_hash, name)
VALUES (
  'admin@fastika.com',
  crypt('admin123', gen_salt('bf')),
  'مدير النظام'
) ON CONFLICT (email) DO NOTHING;

-- =============================================
-- Insert initial stores data (from original HTML)
-- =============================================
INSERT INTO public.stores (name, address, latitude, longitude, google_map_url, is_active) VALUES
('ظمران سنتر', 'إب, الدائري, جوار مدارس الرسالة الاهلية', 13.9750, 44.1750, 'https://maps.app.goo.gl/WiRrmmebpFpnz2mS7', true),
('سوبر ماركت الملكة أروى', 'إب, شارع الملكة اروى', 13.9720, 44.1780, 'https://maps.app.goo.gl/bVzNc73kwfzRnNXL8', true),
('سوبر ماركت الاصيل', 'إب, خط قحزة, جوار جولة الثلاثين', 13.9680, 44.1720, 'https://maps.app.goo.gl/aiBLQRe4A97ioZUE6', true),
('دونس كافي', 'إب, شارع مستشفى الثورة, مقابل مطعم رويال برجر', 13.9700, 44.1760, 'https://maps.app.goo.gl/VX6ubHG4JDXSV5X19', true),
('سوبر ماركت هابي فاملي', 'إب, شارع المعاين, فوق جولة العدين', 13.9660, 44.1700, 'https://maps.app.goo.gl/BGhmZQ2TTbpFD8vp6', true),
('تموينات فندق الثلاثين', 'إب, شارع الثلاثين, امام جامعة العلوم', 13.9640, 44.1680, 'https://maps.app.goo.gl/yF4C4YPizCBso1ue6', true),
('سوبر ماركت الصيف السياحي', 'إب, شارع السبل, مقابل مركز ون مول التجاري', 13.9620, 44.1660, 'https://maps.app.goo.gl/xdVrstYXiHtvHAqKA', true),
('سوبر ماركت ابو ايمن', 'إب, شارع السبل, دخلة الشارع المقابلة لون مول, جوار مسجد عثمان بن عفان', 13.9610, 44.1650, 'https://maps.app.goo.gl/oo1RoEUjnhjZXb498', true),
('سوبر ماركت الاصبحي', 'إب, شارع السبل, جوار مستشفى الحمد', 13.9600, 44.1640, 'https://maps.app.goo.gl/3or6M5teQVCgCJaP9', true),
('السلام ماركت', 'إب, جولة العدين, أمام الورافي للأمانات', 13.9580, 44.1620, 'https://maps.app.goo.gl/V4NppwwW5c5B8Pxb9', true),
('تموينات السعيدة (عقبة)', 'إب, شارع منظمة اليونسيف, جوار مركز السمة', 13.9560, 44.1600, 'https://maps.app.goo.gl/sscp2T4wwyXKZm7X9', true),
('بقالة مكة', 'إب, شارع العدين الاسفل, امام الأمين بيتزا', 13.9540, 44.1580, 'https://maps.app.goo.gl/xznPTHraaZTVYgoK9', true),
('بقالة الملوك', 'إب, الخط الدائري, أمام قاعة الملوك الذهبية', 13.9652817, 44.1633389, 'https://maps.google.com?q=13.9652817,44.1633389', true),
('بقالة مدينة السلام', 'إب, خط الثلاثين, جوار جامعة العلوم والتكنولوجيا', 13.9520, 44.1560, 'https://maps.app.goo.gl/QKGRXXzPtUi9S7m2A', true),
('تموينات أبو زيد (حارث)', 'إب, خط الثلاثين شارع, منظمة اليونسيف', 13.9500, 44.1540, 'https://maps.app.goo.gl/g7xtKApureVD9byS8', true),
('تموينات ابن حزام', 'إب, شارع العدين, جوار مركز مولاتي سنتر', 13.9480, 44.1520, 'https://maps.app.goo.gl/Ygn9PgEsGNFjAw2v8', true),
('بقالة انوار المدينة', 'إب, شارع المحافظة, نزلة منزل الامين العام', 13.9460, 44.1500, 'https://maps.app.goo.gl/j4p89ptE7LBP2MfX6', true),
('بقالة الأرض الطيبة', 'إب, شارع جبل الشجاع, جوار مدرسة إب الاهلية', 13.9440, 44.1480, 'https://maps.app.goo.gl/xDw3trRymDvkh8Ef9', true),
('سوبر ماركت القيروان', 'إب, شارع مستشفى الثورة, جوار مدرسة بلقيس للبنات', 13.9420, 44.1460, 'https://maps.app.goo.gl/HFYYepVW2RiTcGxn6', true),
('آسيا للتسوق', 'إب, السبل, جوار مراسيم الامارات', 13.9400, 44.1440, 'https://maps.app.goo.gl/PwcEQNXNkKxuHGZF9', true),
('سوبر ماركت القصر الملكي', 'إب, السبل , تحت فندق القصر الملكي', 13.9380, 44.1420, 'https://maps.app.goo.gl/3uCwKMa9wHraFqbdA', true),
('سوبر ماركت الثلاثين', 'إب, خط الثلاثين, جوار عين الترويه للمياة', 13.9360, 44.1400, 'https://maps.app.goo.gl/5EeZyZDkhEDjq4Bk6', true),
('سوبر ماركت الحمراء', 'إب , السبل , امام دخلة سوق البركة', 13.9340, 44.1380, 'https://maps.app.goo.gl/PcEp8KkK2tR1q3868', true),
('مني ماركت النور', 'إب , شارع تعز , جوار مستشفى النصر', 13.9320, 44.1360, 'https://maps.app.goo.gl/aLwguUkFVFv7inMAA', true),
('مني ماركت اليونس', 'إب, شارع العدين, خلف شركة سبأ فون', 13.9300, 44.1340, 'https://maps.app.goo.gl/iNGNCTsvPwQAjfiw7', true),
('بقالة الامل', 'إب, شارع 16, خلف فندق أويو السياحي', 13.9280, 44.1320, 'https://maps.app.goo.gl/tuBLdvbCTyE6h8FY8', true)
ON CONFLICT DO NOTHING;

-- =============================================
-- Verify installation
-- =============================================
SELECT 'Migration completed successfully!' AS status;
SELECT COUNT(*) AS stores_count FROM public.stores;
SELECT COUNT(*) AS admins_count FROM public.admins;
