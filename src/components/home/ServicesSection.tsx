'use client';

import Link from 'next/link';
import { SERVICES } from '@/data/services';

export function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-light-gray text-mid-gray px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            Our Services
          </span>
          <h2 className="font-playfair text-4xl font-bold text-[#1A1A1A] mb-3">
            Health Care Services Tailored For Every Need
          </h2>
          <p className="text-mid-gray max-w-md mx-auto">
            Professional, compassionate care for every stage of life — from newborns to seniors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <Link
              key={service.id}
              href={`/service/${service.id}`}
              className={`group bg-white rounded-3xl p-8 border border-border hover:-translate-y-2 hover:shadow-card-lg transition-all duration-300 relative overflow-hidden cursor-pointer block`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-3xl"
                style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}88)` }}
              />

              {/* Arrow */}
              <div className="absolute top-6 right-6 w-9 h-9 rounded-full bg-light-gray flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-all text-sm font-bold">
                →
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-5`}>
                {service.icon}
                
                {/* <img src="images/baby.jpg" alt="" /> */}
              </div>

              {/* Tag */}
              <span className={`inline-block ${service.tagBg} text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
                {service.tag}
              </span>

              <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-3">{service.name}</h3>
              <p className="text-mid-gray text-sm leading-relaxed mb-5">{service.description}</p>

              <div className="flex items-baseline gap-1 text-sm">
                <span className="text-mid-gray">Starting at</span>
                <span className="font-playfair text-2xl font-bold text-charcoal">৳{service.ratePerDay.toLocaleString()}</span>
                <span className="text-mid-gray">/day</span>
              </div>

              <div className="flex items-center gap-1 mt-3">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm font-semibold text-charcoal">{service.rating}</span>
                <span className="text-xs text-mid-gray">({service.reviews.toLocaleString()} reviews)</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
