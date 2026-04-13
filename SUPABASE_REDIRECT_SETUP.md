# Supabase Redirect URL Configuration

## Important: You must configure these redirect URLs in your Supabase dashboard

### Steps to Fix Redirect Issues:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `tixlfiabyvyjdgiyipxe`
3. Navigate to: **Authentication** → **URL Configuration**
4. Add the following URLs to **Redirect URLs**:

```
https://veneer01.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

5. Set **Site URL** to:
```
https://veneer01.vercel.app
```

6. Click **Save**

### Environment Variables

Make sure your Vercel deployment has these environment variables set:

```
NEXT_PUBLIC_SUPABASE_URL=https://tixlfiabyvyjdgiyipxe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGxmaWFieXZ5amRnaXlpcHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDU4NzIsImV4cCI6MjA5MTU4MTg3Mn0.hqX8Nj3wkTqpzKNOoPuqqXJ8F2JwmRhOm82E6FAjRj0
NEXT_PUBLIC_SITE_URL=https://veneer01.vercel.app
```

### To Add Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add each variable above
4. Redeploy your application

### Testing:

After configuration:
1. Try Google OAuth login
2. Try email signup (check email for confirmation link)
3. Verify redirects go to `https://veneer01.vercel.app/auth/callback`

### Troubleshooting:

If you still see localhost redirects:
- Clear browser cache
- Check Supabase dashboard for correct URLs
- Verify environment variables in Vercel
- Redeploy the application
