'use client';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <img src="/images/about-image.jpg" alt="" />
          <div>
            <span className="inline-block bg-light-gray text-mid-gray px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
              About Health-Care
            </span>
            <h2 className="font-playfair text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">
              We Make Caregiving{' '}
              <em className="text-sage not-italic">Effortless</em> & Secure
            </h2>
            <p className="text-mid-gray leading-relaxed mb-4">
              Care.xyz is Bangladesh&apos;s most trusted platform connecting families with professional, background-verified caretakers. Whether you need someone to look after your baby, support your elderly parents, or assist sick family members — we&apos;ve got you covered.
            </p>
            <p className="text-mid-gray leading-relaxed mb-8">
              Every caretaker on our platform undergoes thorough background checks, training verification, and skill assessments to ensure your family&apos;s safety and comfort.
            </p>
            <div className="flex gap-4">
              {[
                { num: '5+', label: 'Years Experience' },
                { num: '64', label: 'Districts Covered' },
                { num: '100%', label: 'Background Verified' },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-border rounded-2xl px-5 py-4 flex-1 text-center">
                  <div className="font-playfair text-2xl font-bold text-sage">{s.num}</div>
                  <div className="text-xs text-mid-gray font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
