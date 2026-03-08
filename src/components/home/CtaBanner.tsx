'use client';
import Link from 'next/link';

export function CtaBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="bg-gradient-to-br from-sage-dark via-sage to-sage-light rounded-[32px] px-8 py-16 text-center relative overflow-hidden">
        <div className="absolute right-[-60px] top-[-60px] text-[20rem] opacity-5 leading-none select-none">❤</div>
        <h2 className="font-playfair text-4xl font-bold text-white mb-3 relative z-10">
          Ready to Find the Perfect Caretaker?
        </h2>
        <p className="text-white/80 mb-8 relative z-10">Join 10,000+ families who trust Care.xyz for their loved ones</p>
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 bg-white text-sage-dark font-bold px-8 py-3.5 rounded-full hover:-translate-y-0.5 hover:shadow-xl transition-all relative z-10"
        >
          🌿 Get Started Today
        </Link>
      </div>
    </div>
  );
}
