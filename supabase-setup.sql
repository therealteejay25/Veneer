-- =====================================================
-- VENEER BIO CARD APP - SUPABASE DATABASE SETUP
-- =====================================================
-- Run this entire script in your Supabase SQL Editor
-- =====================================================

-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username text UNIQUE NOT NULL,
  name text,
  role text,
  location text,
  phone text,
  bio text,
  cover_image text,
  profile_image text,
  instagram text,
  whatsapp text,
  twitter text,
  linkedin text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Create index on username for fast lookups
CREATE INDEX profiles_username_idx ON profiles(username);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- =====================================================
-- STORAGE BUCKET POLICIES
-- =====================================================
-- After running this SQL, go to Storage > Create bucket
-- Name: profile-images
-- Make it PUBLIC
-- Then run these policies:
-- =====================================================

-- Allow anyone to read images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'profile-images' );

-- Allow authenticated users to upload their own images
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile-images' 
  AND auth.role() = 'authenticated'
);

-- Allow users to update their own images
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own images
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Next steps:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create a new bucket called "profile-images"
-- 3. Make it PUBLIC
-- 4. The storage policies above will secure it
-- =====================================================
