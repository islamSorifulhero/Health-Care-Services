'use client';

import Link from 'next/link';
import { Service } from '@/types';

export function ServiceDetailClient({ service }: { service: Service }) {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className={`inline-flex items-center gap-2 ${service.tagBg} text-xs font-semibold px-4 py-1.5 rounded-full mb-5`}>
            {service.icon} {service.tag}
          </span>
          <h1 className="font-playfair text-5xl font-bold text-[#1A1A1A] leading-tight mb-4">
            {service.name}
          </h1>
          <p className="text-mid-gray leading-relaxed text-lg mb-6">{service.longDescription}</p>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-400">★</span>
              <strong className="text-charcoal">{service.rating}</strong>
              <span className="text-mid-gray text-sm">({service.reviews.toLocaleString()} reviews)</span>
            </div>
            <div className="w-px h-5 bg-border" />
            <span className="text-mid-gray text-sm">✅ Background Verified</span>
            <span className="text-mid-gray text-sm">🕐 24/7 Available</span>
          </div>

          {/* Price box */}
          <div className="bg-sage rounded-2xl p-6 flex items-center justify-between mb-6">
            <div>
              <p className="text-white/80 text-sm">Daily Rate</p>
              <p className="font-playfair text-4xl font-bold text-white">৳{service.ratePerDay.toLocaleString()}</p>
              <p className="text-white/70 text-sm">per day • All inclusive</p>
            </div>
            <span className="text-6xl">{service.icon}</span>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              href={`/booking/${service.id}`}
              className="inline-flex items-center gap-2 bg-sage text-white px-7 py-3.5 rounded-full font-semibold hover:bg-sage-dark hover:-translate-y-0.5 transition-all shadow-sage"
            >
              📋 Book This Service
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-border text-charcoal px-7 py-3.5 rounded-full font-medium hover:border-sage hover:text-sage transition-all"
            >
              ← Back to Services
            </Link>
          </div>
        </div>

        <div className={`h-[400px] bg-gradient-to-br ${service.bgGradient} rounded-[32px] flex items-center justify-center`}>
          <span className="text-[10rem]">{service.icon}</span>
        </div>
      </div>

      {/* Features */}
      <div className="bg-warm-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-block bg-light-gray text-mid-gray px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3">What&apos;s Included</span>
            <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A]">Service Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {service.features.map((f) => (
              <div key={f.title} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-border">
                <span className="text-2xl mt-0.5">{f.icon}</span>
                <div>
                  <p className="font-semibold text-charcoal text-sm mb-1">{f.title}</p>
                  <p className="text-mid-gray text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-sage rounded-3xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-1">Ready to book {service.name}?</h3>
              <p className="text-white/80">Get professional care starting at ৳{service.ratePerDay.toLocaleString()}/day</p>
            </div>
            <Link
              href={`/booking/${service.id}`}
              className="bg-white text-sage-dark font-bold px-8 py-3.5 rounded-full hover:-translate-y-0.5 hover:shadow-xl transition-all whitespace-nowrap"
            >
              Book Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
