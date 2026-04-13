# Veneer - Bio Card App Setup

A beautiful bio card application built with Next.js and Supabase, similar to Linktree.

## Features

- 🔐 Authentication (Google OAuth & Email/Password)
- 👤 Custom username selection
- 📝 Real-time profile editing
- 🔗 Four social links (Instagram, WhatsApp, X, LinkedIn)
- 🎨 Beautiful UI with live preview
- 📱 Shareable profile pages (yoursite.com/username)

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon key

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
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
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Create index on username for fast lookups
create index profiles_username_idx on profiles(username);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute procedure update_updated_at_column();
```

### 5. Setup Storage Bucket

1. Go to Supabase Dashboard > Storage
2. Create a new bucket called `profile-images`
3. Make it **public**
4. Add these policies in the Storage Policies section:

```sql
-- Allow anyone to read images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'profile-images' );

-- Allow authenticated users to upload their own images
create policy "Authenticated users can upload"
on storage.objects for insert
with check (
  bucket_id = 'profile-images' 
  AND auth.role() = 'authenticated'
);

-- Allow users to update their own images
create policy "Users can update own images"
on storage.objects for update
using (
  bucket_id = 'profile-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own images
create policy "Users can delete own images"
on storage.objects for delete
using (
  bucket_id = 'profile-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### 6. Configure Google OAuth (Optional)

1. Go to Supabase Dashboard > Authentication > Providers
2. Enable Google provider
3. Add your Google OAuth credentials
4. Add authorized redirect URL: `https://your-project.supabase.co/auth/v1/callback`

### 7. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage Flow

1. **Sign Up/Sign In** - Users authenticate via Google or email/password
2. **Choose Username** - First-time users select a unique username
3. **Edit Profile** - Users fill in their bio card details with live preview
4. **Share** - Users get a shareable link: `yoursite.com/username`

## Project Structure

```
app/
├── auth/              # Authentication pages
├── dashboard/         # Profile editing dashboard
├── onboarding/        # Username selection
├── [username]/        # Public profile pages
lib/
├── supabase/          # Supabase client utilities
```

## Tech Stack

- Next.js 16 (App Router)
- Supabase (Auth & Database)
- TypeScript
- Tailwind CSS
- Hugeicons React

## Notes

- Usernames are permanent (can only be changed in settings)
- All profile data is stored in Supabase
- Real-time updates as you type
- Responsive design
- Copy-to-clipboard functionality for social links
