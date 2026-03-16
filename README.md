# Sapore Di Mare

A luxury modern restaurant website for **Sapore Di Mare** — a Michelin-starred Italian seafood restaurant in Mayfair, London. Built with Next.js 14, Tailwind CSS, and Supabase.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Auth & Database | Supabase (`@supabase/ssr`) |
| Icons | Lucide React |
| Package Manager | npm |

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd sapore-di-mare
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

You can find these in your Supabase project under **Settings → API**.

### 4. Set up the Supabase database

In your Supabase project, go to **SQL Editor** and run the contents of `supabase-schema.sql`. This will:

- Create the `reservations` table
- Enable Row Level Security (RLS)
- Add policies so users can only access their own reservations
- Add an index on `user_id + date` for fast queries
- Add an `updated_at` auto-update trigger

### 5. Configure Supabase Auth

In your Supabase dashboard:

1. Go to **Authentication → Settings**
2. Set your **Site URL** to `http://localhost:3000` (for development)
3. Add `http://localhost:3000/**` to **Redirect URLs**
4. Optionally enable **Email Confirmations** under Auth providers

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
sapore-di-mare/
├── app/
│   ├── layout.js               # Root layout (Navbar, Footer, fonts)
│   ├── globals.css             # Global styles, design tokens, scrollbar
│   ├── page.js                 # Homepage (/)
│   ├── about/
│   │   └── page.js             # About page (/about)
│   ├── menu/
│   │   ├── page.js             # Menu list (/menu)
│   │   ├── a-la-carte/
│   │   │   └── page.js         # À la carte menu
│   │   ├── dessert/
│   │   │   └── page.js         # Dessert menu
│   │   └── wine-list/
│   │       └── page.js         # Wine list
│   ├── booking/
│   │   └── page.js             # Protected reservations page
│   └── auth/
│       ├── login/
│       │   └── page.js         # Login page
│       └── register/
│           └── page.js         # Registration page
├── components/
│   ├── Navbar.jsx              # Fixed nav with scroll blur, auth state
│   ├── Footer.jsx              # 4-column footer
│   └── ReservationDashboard.jsx # Full CRUD reservation manager
├── lib/
│   └── supabase/
│       ├── client.js           # Browser Supabase client
│       └── server.js           # Server Supabase client (for RSCs)
├── middleware.js               # Auth protection + session refresh
├── supabase-schema.sql         # Database schema + RLS policies
├── next.config.mjs             # Next.js config (image domains)
├── tailwind.config.js          # Tailwind theme (gold, noir, cream)
├── postcss.config.js
├── .env.local.example
└── package.json
```

---

## Pages

| Route | Description | Auth Required |
|---|---|---|
| `/` | Homepage with hero, intro, dish grid, press quote, map | No |
| `/about` | Philosophy, chef bio, values grid | No |
| `/menu` | Menu overview with 3 cards | No |
| `/menu/a-la-carte` | Full à la carte menu (6 sections) | No |
| `/menu/dessert` | Dessert menu | No |
| `/menu/wine-list` | Full wine list by region | No |
| `/booking` | Reservation dashboard with full CRUD | **Yes** |
| `/auth/login` | Split-layout login | No |
| `/auth/register` | Registration with email confirmation | No |

---

## Design System

### Colours

| Token | Hex | Usage |
|---|---|---|
| `gold` | `#C9A84C` | Accents, CTAs, prices |
| `gold-light` | `#D4B96A` | Hover states |
| `noir` | `#0A0A0A` | Background |
| `noir-mid` | `#1A1A1A` | Card backgrounds |
| `cream` | `#F5F0E8` | Primary text |

### Fonts

| Role | Font | Class |
|---|---|---|
| Display / headings | Cormorant Garamond | `font-display` |
| Body | Outfit | `font-body` (default) |
| Labels / mono | DM Mono | `font-mono-label` |

### Components

- **`.btn-gold`** — outlined gold button with fill-on-hover animation
- **`.btn-gold-filled`** — solid gold button
- **`.section-label`** — uppercase DM Mono label with gold colour
- **`.gold-divider`** — gradient gold horizontal rule

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add the two environment variables in Vercel project settings
4. Deploy

### Environment Variables for Production

In Vercel (or your host), set:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Update your Supabase **Site URL** and **Redirect URLs** to your production domain.

---

## Restaurant Details

| | |
|---|---|
| **Name** | Sapore Di Mare |
| **Address** | 22 Queen Street, Mayfair, W1J 5HN, London |
| **Phone** | +44 7435 205407 |
| **Email** | saporedm.restaurant@gmail.com |
| **Founded** | 1999 |
| **Chef** | Mario Rossi (Michelin-starred) |

---

## License

Private — all rights reserved.
