import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-[72px] flex items-center justify-center text-center px-4">
      <div>
        <p className="font-playfair font-bold text-light-gray select-none" style={{ fontSize: 'clamp(6rem, 20vw, 14rem)', lineHeight: 1 }}>
          404
        </p>
        <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mt-2 mb-3">Page Not Found</h2>
        <p className="text-mid-gray mb-8 max-w-sm mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back home.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-sage text-white px-8 py-3.5 rounded-full font-semibold hover:bg-sage-dark hover:-translate-y-0.5 transition-all shadow-sage"
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
