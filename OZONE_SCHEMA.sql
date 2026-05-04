-- OZONE LABS - DATABASE SCHEMA
-- Execute this SQL in your Supabase SQL Editor

-- 1. CATEGORIES TABLE
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    inventory_type TEXT NOT NULL, -- workstations, flagships, components
    description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PRODUCTS TABLE
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    name TEXT, -- Alias for title
    brand TEXT,
    model TEXT,
    price DECIMAL(12, 2) DEFAULT 0,
    inventory_type TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    category TEXT, -- Slug for compatibility
    specifications JSONB DEFAULT '{}',
    image_url TEXT,
    image TEXT, -- Alias for image_url
    images TEXT[] DEFAULT '{}',
    in_stock BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. MESSAGES TABLE
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. REVIEWS TABLE
CREATE TABLE reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    review_text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. SITE SETTINGS TABLE
CREATE TABLE site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_name TEXT DEFAULT 'OZONE LABS',
    logo_url TEXT,
    whatsapp_number TEXT,
    phone_number TEXT,
    email TEXT,
    address TEXT,
    about_text TEXT,
    facebook_url TEXT,
    instagram_url TEXT,
    tiktok_url TEXT,
    youtube_url TEXT,
    twitter_url TEXT,
    discord_url TEXT,
    reddit_url TEXT,
    twitch_url TEXT,
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_video_url TEXT,
    pc_builder_image TEXT,
    maintenance_mode BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. INVENTORY SLIDES TABLE
CREATE TABLE inventory_slides (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. SERVICES TABLE
CREATE TABLE services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- Lucide icon name
    image_url TEXT,
    price_start TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. HERO TABLE (FOR MULTI-SLIDE HERO)
CREATE TABLE hero (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    subtitle TEXT,
    image_url TEXT,
    video_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. SOCIAL FEED TABLE
CREATE TABLE social_feed (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    platform TEXT, -- FB, IG, etc.
    post_url TEXT,
    image_url TEXT,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. VIDEO REELS TABLE
CREATE TABLE video_reels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. PC BUILDS (SAVED CONFIGURATIONS)
CREATE TABLE pc_builds (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID, -- If auth is enabled
    config_name TEXT,
    components JSONB NOT NULL,
    total_price DECIMAL(12, 2),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT INITIAL SETTINGS
INSERT INTO site_settings (id, site_name, whatsapp_number, phone_number, email, address)
VALUES ('inventory_header_text', 'OZONE LABS', '94777539333', '077 753 9333', 'ozonecomputer7@gmail.com', 'Deiyandara, Sri Lanka')
ON CONFLICT (id) DO NOTHING;

-- ENABLE RLS (OPTIONAL BUT RECOMMENDED)
-- For a public-facing shop, you might want to allow SELECT for everyone
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_reels ENABLE ROW LEVEL SECURITY;

-- CREATE PUBLIC SELECT POLICIES
CREATE POLICY "Allow public select" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public select" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public select" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public select" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public select" ON inventory_slides FOR SELECT USING (true);
CREATE POLICY "Allow public select" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public select" ON hero FOR SELECT USING (true);
CREATE POLICY "Allow public select" ON social_feed FOR SELECT USING (true);
CREATE POLICY "Allow public select" ON video_reels FOR SELECT USING (true);
