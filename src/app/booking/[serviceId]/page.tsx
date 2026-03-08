'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useBookings } from '@/context/BookingContext';
import { SERVICES, DIVISIONS, DURATION_OPTIONS, PLATFORM_FEE } from '@/data/services';
import { Booking } from '@/types';
import toast from 'react-hot-toast';

interface Props {
  params: { serviceId: string };
}

export default function BookingPage({ params }: Props) {
  const { user, loading } = useAuth();
  const { addBooking } = useBookings();
  const router = useRouter();
  const service = SERVICES.find((s) => s.id === params.serviceId);

  const [selectedDuration, setSelectedDuration] = useState<{ label: string; days: number } | null>(null);
  const [customDays, setCustomDays] = useState('');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      // Save intent in sessionStorage
      sessionStorage.setItem('pendingBooking', params.serviceId);
      router.push('/login');
    }
  }, [user, loading, router, params.serviceId]);

  if (!service) return <div className="pt-32 text-center text-mid-gray">Service not found.</div>;
  if (loading) return <div className="pt-32 text-center"><div className="w-10 h-10 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto" /></div>;
  if (!user) return null;

  const days = selectedDuration
    ? selectedDuration.days > 0
      ? selectedDuration.days
      : parseInt(customDays) || 0
    : 0;
  const total = days > 0 ? service.ratePerDay * days + PLATFORM_FEE : 0;

  const handleConfirm = () => {
    if (!selectedDuration || days === 0) { toast.error('Please select a duration'); return; }
    if (!division || !district) { toast.error('Please select division and district'); return; }
    if (!city.trim()) { toast.error('Please enter city/upazila'); return; }
    if (!address.trim()) { toast.error('Please enter full address'); return; }

    const booking: Booking = {
      id: 'BK' + Date.now(),
      serviceId: service.id,
      serviceName: service.name,
      serviceIcon: service.icon,
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      duration: `${days} day${days > 1 ? 's' : ''}`,
      days,
      division,
      district,
      city,
      area,
      address,
      notes,
      ratePerDay: service.ratePerDay,
      platformFee: PLATFORM_FEE,
      total,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    addBooking(booking);
    setConfirmedBooking(booking);
    setConfirmed(true);

    // Send email invoice via API
    fetch('/api/send-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booking, userEmail: user.email, userName: user.name }),
    }).catch(() => {});

    toast.success('Booking confirmed! 🎉 Invoice sent to your email.');
  };

  if (confirmed && confirmedBooking) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full border border-border shadow-card-lg text-center">
          <div className="w-20 h-20 rounded-full bg-sage/15 text-sage text-4xl flex items-center justify-center mx-auto mb-5">✅</div>
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-2">Booking Confirmed!</h2>
          <p className="text-mid-gray mb-6 text-sm">Your care service has been booked successfully. An invoice has been sent to <strong>{user.email}</strong></p>
          <div className="bg-cream rounded-2xl p-5 mb-6 text-left space-y-3">
            {[
              ['Booking ID', confirmedBooking.id],
              ['Service', confirmedBooking.serviceName],
              ['Duration', confirmedBooking.duration],
              ['Location', `${confirmedBooking.city}, ${confirmedBooking.district}`],
              ['Total', `৳${confirmedBooking.total.toLocaleString()}`],
              ['Status', confirmedBooking.status],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center text-sm border-b border-light-gray pb-2 last:border-0 last:pb-0">
                <span className="text-mid-gray">{k}</span>
                <span className="font-semibold text-charcoal">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/my-bookings')} className="flex-1 bg-sage text-white py-3 rounded-full font-semibold hover:bg-sage-dark transition-colors">
              View Bookings
            </button>
            <button onClick={() => router.push('/')} className="flex-1 border border-border py-3 rounded-full font-medium hover:border-sage hover:text-sage transition-colors">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-[#1A1A1A] mb-2">Book Your Caretaker</h1>
          <p className="text-mid-gray">
            Booking: <strong>{service.name}</strong> — ৳{service.ratePerDay.toLocaleString()}/day
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Form */}
          <div className="bg-white rounded-3xl p-8 border border-border">
            {/* Duration */}
            <div className="mb-8">
              <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-4 pb-3 border-b border-light-gray flex items-center gap-2">
                ⏱ Duration
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {DURATION_OPTIONS.map((d) => (
                  <button
                    key={d.label}
                    onClick={() => { setSelectedDuration(d); }}
                    className={`py-2.5 rounded-xl text-sm border transition-all font-medium ${
                      selectedDuration?.label === d.label
                        ? 'bg-sage border-sage text-white font-semibold'
                        : 'bg-cream border-border text-charcoal hover:border-sage hover:text-sage'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              {selectedDuration?.days === 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-charcoal mb-2">Custom Duration (days)</label>
                  <input
                    type="number"
                    min="1"
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    placeholder="Enter number of days"
                    className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm text-charcoal focus:border-sage focus:outline-none focus:bg-white"
                  />
                </div>
              )}
            </div>

            {/* Location */}
            <div className="mb-8">
              <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-4 pb-3 border-b border-light-gray flex items-center gap-2">
                📍 Location
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-2">Division</label>
                  <select
                    value={division}
                    onChange={(e) => { setDivision(e.target.value); setDistrict(''); }}
                    className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm text-charcoal focus:border-sage focus:outline-none focus:bg-white appearance-none"
                  >
                    <option value="">Select Division</option>
                    {Object.keys(DIVISIONS).map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-2">District</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm text-charcoal focus:border-sage focus:outline-none focus:bg-white appearance-none"
                  >
                    <option value="">Select District</option>
                    {(DIVISIONS[division] || []).map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-2">City / Upazila</label>
                  <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Dhanmondi" className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm text-charcoal focus:border-sage focus:outline-none focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-2">Area / Thana</label>
                  <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g. Kalabagan" className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm text-charcoal focus:border-sage focus:outline-none focus:bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-2">Full Address</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} placeholder="House/Flat No, Road, Block..." className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm text-charcoal focus:border-sage focus:outline-none focus:bg-white resize-none" />
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-4 pb-3 border-b border-light-gray flex items-center gap-2">
                📝 Special Requirements
              </h3>
              <label className="block text-xs font-semibold text-charcoal mb-2">Any special instructions or health concerns?</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="e.g. Peanut allergy, requires mobility assistance..." className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm text-charcoal focus:border-sage focus:outline-none focus:bg-white resize-none" />
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-white rounded-3xl p-7 border border-border lg:sticky lg:top-24">
            <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-5">Booking Summary</h3>

            <div className="flex items-center gap-3 bg-cream rounded-2xl p-4 mb-5">
              <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center text-2xl`}>{service.icon}</div>
              <div>
                <p className="font-semibold text-sm text-charcoal">{service.name}</p>
                <p className="text-xs text-mid-gray">{service.shortName}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {[
                ['Rate per day', `৳${service.ratePerDay.toLocaleString()}`],
                ['Duration', days > 0 ? `${days} day${days > 1 ? 's' : ''}` : 'Not selected'],
                ['Platform fee', `৳${PLATFORM_FEE}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm border-b border-light-gray pb-2.5">
                  <span className="text-mid-gray">{k}</span>
                  <span className="font-semibold text-charcoal">{v}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-sage to-sage-dark rounded-2xl p-5 flex justify-between items-center mb-4">
              <div>
                <p className="text-white/70 text-xs mb-1">Total Amount</p>
                <p className="font-playfair text-3xl font-bold text-white">৳{total.toLocaleString()}</p>
              </div>
              <span className="text-3xl">💳</span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-terracotta text-white py-4 rounded-2xl font-bold text-base hover:bg-terracotta/90 hover:-translate-y-0.5 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              ✅ Confirm Booking
            </button>

            <div className="flex justify-center gap-5 mt-4">
              {['🔒 Secure', '✅ Verified', '📧 Invoice'].map((b) => (
                <span key={b} className="text-xs text-mid-gray flex items-center gap-1">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
