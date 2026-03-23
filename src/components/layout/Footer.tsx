import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="font-playfair text-2xl font-bold text-white flex items-center gap-1 mb-4">
              Health-Care
              <span className="w-2 h-2 bg-terracotta rounded-full ml-0.5" />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Bangladesh&apos;s most trusted platform for professional, background-verified care services for children, elderly, and sick family members.
            </p>
            <div className="flex gap-3 mt-5">
              {['📘', '🐦', '📸'].map((icon, i) => (
                <div key={i} className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Services</h4>
            {['Baby Care', 'Elderly Care', 'Sick Care', 'Special Needs'].map((s) => (
              <Link key={s} href="/#services" className="block text-sm mb-2 hover:text-sage-light transition-colors">
                {s}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            {['About Us', 'How It Works', 'Careers', 'Blog'].map((s) => (
              <a key={s} href="#" className="block text-sm mb-2 hover:text-sage-light transition-colors">
                {s}
              </a>
            ))}
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Support</h4>
            {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((s) => (
              <a key={s} href="#" className="block text-sm mb-2 hover:text-sage-light transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <span>© 2025 Health-Care. All rights reserved.</span>
          <span className="text-white/30">Made with ❤️ in Bangladesh</span>
        </div>
      </div>
    </footer>
  );
}
