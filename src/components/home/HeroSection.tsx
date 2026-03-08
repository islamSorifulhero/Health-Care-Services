'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="min-h-screen pt-[72px] flex items-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-sage/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-terracotta/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        {/* Content */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-sage-light/30 text-sage-dark px-4 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-wide">
            ✦ Trusted by 10,000+ Families
          </div>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.1] mb-5">
            Caring Hands for Your{' '}
            <em className="text-sage not-italic">Beloved</em>{' '}
            Family Members
          </h1>
          <p className="text-mid-gray text-lg leading-relaxed mb-8 max-w-[480px]">
            Find verified, compassionate caretakers for your children, elderly parents, or loved ones in need. Safe, reliable, and always just a few clicks away.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 bg-sage text-white px-7 py-3.5 rounded-full font-semibold hover:bg-sage-dark hover:-translate-y-0.5 transition-all shadow-sage"
            >
              🌿 Explore Services
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center gap-2 border border-border text-charcoal px-7 py-3.5 rounded-full font-medium hover:border-sage hover:text-sage hover:-translate-y-0.5 transition-all"
            >
              ▶ How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { num: '10K+', label: 'Happy Families' },
              { num: '500+', label: 'Verified Caretakers' },
              { num: '98%', label: 'Satisfaction Rate' },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-playfair text-3xl font-bold text-charcoal block">{stat.num}</span>
                <span className="text-xs text-mid-gray font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="flex justify-center items-center relative">
          <div className="relative w-[340px] h-[420px] lg:w-[400px] lg:h-[480px]">
            {/* Main card */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage to-sage-dark rounded-[40px_40px_80px_40px] overflow-hidden flex items-end p-7">
              <div className="absolute top-[-20px] right-[-10px] text-[12rem] opacity-20 leading-none select-none">🌸</div>
              <p className="font-playfair text-xl italic text-white/90 relative z-10">
                &ldquo;Every family deserves the best care&rdquo;
              </p>
            </div>

            {/* Floating card 1 */}
            <div className="absolute top-6 right-[-30px] lg:right-[-50px] bg-white rounded-2xl p-3.5 shadow-card-lg flex items-center gap-3 animate-float">
              <span className="text-2xl">👶</span>
              <div>
                <p className="text-xs font-semibold text-charcoal">Baby Care Available</p>
                <p className="text-xs text-mid-gray">24/7 Support</p>
              </div>
            </div>

            {/* Floating card 2 */}
            <div
              className="absolute bottom-20 left-[-30px] lg:left-[-50px] bg-white rounded-2xl p-3.5 shadow-card-lg flex items-center gap-3 animate-float"
              style={{ animationDelay: '1.5s' }}
            >
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-xs font-semibold text-charcoal">4.9/5 Rating</p>
                <p className="text-xs text-mid-gray">Verified Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
