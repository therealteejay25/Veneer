# 🚨 FIX SUPABASE REDIRECTS NOW

## THE PROBLEM
Supabase is redirecting to localhost because YOU HAVEN'T CONFIGURED THE REDIRECT URLs IN YOUR SUPABASE DASHBOARD.

## THE SOLUTION (DO THIS NOW)

### Step 1: Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard/project/tixlfiabyvyjdgiyipxe
2. Login if needed

### Step 2: Configure Authentication URLs
1. Click **Authentication** in the left sidebar
2. Click **URL Configuration**
3. Find **Redirect URLs** section
4. Click **Add URL** and add:
   ```
   https://veneer01.vercel.app/auth/callback
   ```
5. Find **Site URL** field and set it to:
   ```
   https://veneer01.vercel.app
   ```
6. Click **SAVE** at the bottom

### Step 3: Verify Vercel Environment Variables
1. Go to: https://vercel.com/dashboard
2. Find your Veneer 