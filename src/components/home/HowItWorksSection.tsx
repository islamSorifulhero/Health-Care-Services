'use client';

export function HowItWorksSection() {
  const steps = [
    { num: '1', title: 'Choose Service', desc: 'Browse our services and pick what your family needs — baby, elderly, or sick care.' },
    { num: '2', title: 'Set Details', desc: 'Select duration, your location, and specific requirements for the caretaker.' },
    { num: '3', title: 'Confirm Booking', desc: 'Review total cost and confirm. You\'ll get an email invoice instantly.' },
    { num: '4', title: 'Receive Care', desc: 'Our verified caretaker arrives on time. Track status in My Bookings.' },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-light-gray text-mid-gray px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            Simple Process
          </span>
          <h2 className="font-playfair text-4xl font-bold text-[#1A1A1A] mb-3">Book a Caretaker in 4 Easy Steps</h2>
          <p className="text-mid-gray max-w-md mx-auto">From search to confirmation in minutes — we make it simple for every family</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          {steps.map((step) => (
            <div key={step.num} className="text-center relative z-10">
              <div className="w-[72px] h-[72px] rounded-full bg-sage text-white font-playfair text-2xl font-bold flex items-center justify-center mx-auto mb-5 shadow-sage">
                {step.num}
              </div>
              <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-2">{step.title}</h3>
              <p className="text-mid-gray text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
