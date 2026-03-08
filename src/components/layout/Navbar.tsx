'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    router.push('/');
    setDropdownOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#services', label: 'Services' },
    { href: '/#about', label: 'About' },
    { href: '/#how-it-works', label: 'How It Works' },
  ];

  const initial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-xl shadow-card' : 'bg-cream/80 backdrop-blur-md'
      } border-b border-border`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 font-playfair text-2xl font-bold text-charcoal">
            Care<span className="text-sage">.xyz</span>
            <span className="w-2 h-2 bg-terracotta rounded-full ml-0.5 inline-block" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-light-gray text-charcoal'
                    : 'text-mid-gray hover:text-charcoal hover:bg-light-gray'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/my-bookings"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === '/my-bookings'
                    ? 'bg-light-gray text-charcoal'
                    : 'text-mid-gray hover:text-charcoal hover:bg-light-gray'
                }`}
              >
                My Bookings
              </Link>
            )}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-white hover:shadow-card transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-sage text-white flex items-center justify-center text-sm font-semibold">
                    {initial}
                  </div>
                  <span className="text-sm font-medium text-charcoal max-w-[120px] truncate">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <FiChevronDown className={`text-mid-gray transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 bg-white border border-border rounded-2xl shadow-card-lg p-2 min-w-[180px] z-50">
                    <Link
                      href="/my-bookings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm hover:bg-cream transition-colors"
                    >
                      📋 My Bookings
                    </Link>
                    <hr className="my-1 border-light-gray" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-terracotta hover:bg-orange-50 transition-colors"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full text-sm font-medium text-mid-gray hover:text-charcoal hover:bg-light-gray transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 bg-sage text-white rounded-full text-sm font-semibold hover:bg-sage-dark transition-all hover:-translate-y-0.5 shadow-sage"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-charcoal"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-warm-white px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-charcoal hover:bg-light-gray transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/my-bookings" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium text-charcoal hover:bg-light-gray">
                📋 My Bookings
              </Link>
              <button onClick={handleLogout} className="px-4 py-3 rounded-xl text-sm font-medium text-terracotta text-left hover:bg-orange-50">
                🚪 Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 border border-border rounded-xl text-sm font-medium">
                Sign In
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 bg-sage text-white rounded-xl text-sm font-semibold">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
