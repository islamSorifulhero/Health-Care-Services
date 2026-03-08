# Care.xyz – Trusted Care Services Platform

A full-featured Next.js 14 web application for booking babysitting, elderly care, and sick care services.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env.local
```
Fill in your values in `.env.local`:
- `EMAIL_USER` / `EMAIL_PASS` – Gmail App Password for invoice emails
- `NEXT_PUBLIC_APP_URL` – Your deployment URL

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx             # 404 page
│   ├── login/page.tsx            # Login
│   ├── register/page.tsx         # Registration
│   ├── my-bookings/page.tsx      # My Bookings (private)
│   ├── service/[serviceId]/      # Service detail
│   ├── booking/[serviceId]/      # Booking page (private)
│   └── api/send-invoice/         # Email invoice API
├── components/
│   ├── layout/Navbar.tsx
│   ├── layout/Footer.tsx
│   └── home/                     # All homepage sections
├── context/
│   ├── AuthContext.tsx           # Auth state
│   └── BookingContext.tsx        # Booking state
├── data/services.ts              # Services, divisions, durations
└── types/index.ts                # TypeScript types
```

---

## ✅ Features

- **Responsive Design** – Mobile, tablet & desktop
- **User Authentication** – Email/Password + Google Login simulation
- **Service Pages** – Baby Care, Elderly Care, Sick Care with metadata
- **Dynamic Booking** – Duration picker, Bangladesh location selector
- **Auto Cost Calculation** – Rate × Days + Platform fee
- **My Bookings Dashboard** – Track status, filter, cancel, view details
- **Email Invoice** – Auto-sent on booking confirmation (configure SMTP)
- **Private Routes** – Booking & My Bookings require authentication
- **404 Page** – Custom not found page

---

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

---

## 📧 Email Setup (Gmail)

1. Enable 2FA on your Gmail account
2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Add to `.env.local`:
```
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-16-char-app-password
```
# Health-Care-Services
