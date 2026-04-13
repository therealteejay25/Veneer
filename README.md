# Veneer - Beautiful Bio Cards

A modern, elegant bio card application built with Next.js 16 and Supabase. Create your personalized bio card and share it with the world - like Linktree, but better.

![Veneer](https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Storage-green?style=for-the-badge&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## ✨ Features

- 🔐 **Secure Authentication** - Google OAuth & Email/Password via Supabase
- 👤 **Custom Usernames** - Unique, permanent usernames with availability checking
- 📝 **Real-time Editing** - Live preview as you type
- 🖼️ **Image Uploads** - Direct upload to Supabase Storage for profile and cover images
- 🔗 **Four Social Links** - Instagram, WhatsApp, X (Twitter), and LinkedIn
- 📋 **Smart Copy** - Copy full URLs with one click
- 🎨 **Beautiful UI** - Clean, modern design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🚀 **Shareable Links** - `yoursite.com/username` format
- 🔔 **Toast Notifications** - Beautiful feedback for all actions
- 🎯 **Viral Loop** - "Create Your Own" CTA on public profiles

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- pnpm (or npm/yarn)
- A Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd veneer
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the script from `supabase-setup.sql`
   - Go to Storage and create a bucket named `profile-images` (make it public)
   - (Optional) Configure Google OAuth in Authentication > Providers

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
veneer/
├── app/
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Profile editing dashboard
│   ├── onboarding/        # Username selection
│   ├── [username]/        # Public profile pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   └── Toast.tsx          # Toast notification component
├── lib/
│   └── supabase/          # Supabase client utilities
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server client
│       └── middleware.ts  # Auth middleware
├── public/                # Static assets
├── middleware.ts          # Next.js middleware
├── supabase-setup.sql     # Database schema
└── next.config.ts         # Next.js configuration
```

## 🎯 User Flow

1. **Landing Page** → User sees the homepage with "Get Started" button
2. **Authentication** → Sign up with Google or Email/Password
3. **Onboarding** → Choose a unique username (permanent)
4. **Dashboard** → Edit profile with live preview:
   - Upload profile and cover images
   - Add name, role, location, phone, bio
   - Add social links (Instagram, WhatsApp, X, LinkedIn)
5. **Share** → Get shareable link: `yoursite.com/username`
6. **Public Profile** → Anyone can view the bio card

## 🛠️ Tech Stack

- **Framework:** Next.js 16.2.3 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Icons:** Hugeicons React
- **Package Manager:** pnpm

## 🔒 Security Features

- Row Level Security (RLS) policies
- HTTP-only cookies for sessions
- Secure image uploads with user-specific paths
- Protected routes with middleware
- Input validation and sanitization

## 📊 Database Schema

```sql
profiles (
  id uuid PRIMARY KEY,
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
  created_at timestamp,
  updated_at timestamp
)
```

## 🎨 Key Features Explained

### Real-time Preview
As you edit your profile in the dashboard, the card preview updates instantly on the right side.

### Image Upload
- Click upload buttons to select images
- Images are uploaded to Supabase Storage
- URLs are automatically saved to the database
- Preview shows immediately after upload

### Smart Copy
When users click the copy button on social links, it copies the full URL:
- Instagram: `https://instagram.com/username`
- WhatsApp: `https://wa.me/phone`
- X: `https://x.com/username`
- LinkedIn: `https://linkedin.com/in/username`

### Toast Notifications
Beautiful, non-intrusive notifications for:
- Profile updates
- Image uploads
- Link copying
- Errors and validations

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- Self-hosted

## 🔧 Configuration

### Next.js Image Domains

The app is configured to allow images from your Supabase storage. Update `next.config.ts` if you change your Supabase URL:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-project.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
}
```

### Supabase Storage

Ensure your `profile-images` bucket is:
- Public (for viewing images)
- Has proper RLS policies (see `supabase-setup.sql`)

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- Icons by [Hugeicons](https://hugeicons.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ by Tayo.
