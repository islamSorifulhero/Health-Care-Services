import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { BookingProvider } from '@/context/BookingContext';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Health-Care – Trusted Baby & Elderly Care Services',
  description:
    'Health-Care – Bangladesh\'s most trusted platform for professional babysitting, elderly care, and sick care services. Book verified caretakers easily and securely.',
  keywords: 'baby care, elderly care, caretaker, babysitter, home care, Bangladesh',
  openGraph: {
    title: 'Health-Care – Trusted Care Services',
    description: 'Find verified caretakers for your children, elderly parents, or sick family members.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream min-h-screen flex flex-col">
        <AuthProvider>
          <BookingProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#2C2C2C',
                  color: '#fff',
                  borderRadius: '12px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.88rem',
                },
                success: { iconTheme: { primary: '#7C9A85', secondary: '#fff' } },
                error: { iconTheme: { primary: '#C4714A', secondary: '#fff' } },
              }}
            />
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
