'use client';

const TESTIMONIALS = [
  { name: 'Fatema Begum', location: 'Dhaka, Baby Care', text: 'Care.xyz found us an amazing babysitter within hours. She was so gentle with our 2-year-old. We couldn\'t have asked for better!' },
  { name: 'Rahim Chowdhury', location: 'Chittagong, Elderly Care', text: 'My father needed round-the-clock care after his surgery. The elderly care specialist was professional, patient, and truly compassionate.' },
  { name: 'Nusrat Jahan', location: 'Sylhet, Sick Care', text: 'Booking was so easy — I did it from my phone in 5 minutes. The caretaker for my sick mother was incredible. Highly recommend!' },
];

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-light-gray text-mid-gray px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">Testimonials</span>
          <h2 className="font-playfair text-4xl font-bold text-[#1A1A1A] mb-3">Families Love Health-Care</h2>
          <p className="text-mid-gray max-w-md mx-auto">Real stories from real families who found trusted care through our platform</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-7 border border-border relative overflow-hidden">
              <div className="absolute top-3 right-5 font-playfair text-7xl text-sage-light/40 leading-none select-none">&ldquo;</div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
              </div>
              <p className="text-mid-gray text-sm leading-relaxed mb-5 relative z-10">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage to-sage-dark text-white flex items-center justify-center text-sm font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                  <p className="text-xs text-mid-gray">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
