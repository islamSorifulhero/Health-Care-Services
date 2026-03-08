'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useBookings } from '@/context/BookingContext';
import { Booking } from '@/types';
import Link from 'next/link';
import toast from 'react-hot-toast';

const STATUS_STYLES: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Confirmed: 'bg-green-100 text-green-700',
  Completed: 'bg-sage/20 text-sage-dark',
  Cancelled: 'bg-orange-100 text-terracotta',
};

const STATUS_ICONS: Record<string, string> = {
  Pending: '⏳', Confirmed: '✅', Completed: '🏆', Cancelled: '❌',
};

export default function MyBookingsPage() {
  const { user, loading } = useAuth();
  const { cancelBooking, getUserBookings } = useBookings();
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) return <div className="pt-32 text-center"><div className="w-10 h-10 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto" /></div>;
  if (!user) return null;

  const allBookings = getUserBookings(user.email);
  const filtered = filter === 'all' ? allBookings : allBookings.filter((b) => b.status === filter);

  const handleCancel = (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    cancelBooking(id);
    toast.success('Booking cancelled');
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="pt-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block bg-light-gray text-mid-gray px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3">Dashboard</span>
          <h1 className="font-playfair text-4xl font-bold text-[#1A1A1A] mb-1">My Bookings</h1>
          <p className="text-mid-gray">Track all your care service bookings and their status</p>
        </div>

        {allBookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-2">No Bookings Yet</h3>
            <p className="text-mid-gray mb-6">You haven&apos;t made any bookings yet. Explore our services!</p>
            <Link href="/#services" className="inline-flex items-center gap-2 bg-sage text-white px-7 py-3.5 rounded-full font-semibold hover:bg-sage-dark transition-all">
              🌿 Explore Services
            </Link>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <p className="text-sm text-mid-gray">{filtered.length} booking{filtered.length !== 1 ? 's' : ''}</p>
              <div className="flex gap-2 flex-wrap">
                {['all', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      filter === s ? 'bg-sage text-white border-sage' : 'border-border text-charcoal hover:border-sage hover:text-sage'
                    }`}
                  >
                    {s === 'all' ? 'All' : s}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop table */}
            <div className="bg-white rounded-3xl border border-border overflow-hidden hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-cream">
                    {['Booking ID', 'Service', 'Duration', 'Location', 'Total', 'Date', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-mid-gray uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id} className="border-t border-light-gray hover:bg-cream/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs text-mid-gray">{b.id}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{b.serviceIcon}</span>
                          <span className="text-sm font-semibold text-charcoal">{b.serviceName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm">{b.duration}</td>
                      <td className="px-5 py-4 text-sm max-w-[150px] truncate" title={`${b.city}, ${b.district}`}>
                        {b.city}, {b.district}
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-sage">৳{b.total.toLocaleString()}</td>
                      <td className="px-5 py-4 text-sm text-mid-gray">{b.createdAt}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[b.status]}`}>
                          {STATUS_ICONS[b.status]} {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => setSelected(b)} className="border border-border rounded-lg px-3 py-1.5 text-xs font-semibold hover:border-sage hover:text-sage transition-colors">
                            Details
                          </button>
                          {b.status === 'Pending' && (
                            <button onClick={() => handleCancel(b.id)} className="border border-terracotta text-terracotta rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-terracotta hover:text-white transition-colors">
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {filtered.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl border border-border p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{b.serviceIcon}</span>
                      <div>
                        <p className="font-semibold text-sm text-charcoal">{b.serviceName}</p>
                        <p className="text-xs text-mid-gray">{b.createdAt}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[b.status]}`}>
                      {STATUS_ICONS[b.status]} {b.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div><span className="text-mid-gray">Duration: </span>{b.duration}</div>
                    <div><span className="text-mid-gray">Total: </span><strong className="text-sage">৳{b.total.toLocaleString()}</strong></div>
                    <div className="col-span-2"><span className="text-mid-gray">Location: </span>{b.city}, {b.district}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelected(b)} className="flex-1 border border-border rounded-xl py-2 text-xs font-semibold hover:border-sage hover:text-sage transition-colors">
                      View Details
                    </button>
                    {b.status === 'Pending' && (
                      <button onClick={() => handleCancel(b.id)} className="flex-1 border border-terracotta text-terracotta rounded-xl py-2 text-xs font-semibold hover:bg-terracotta hover:text-white transition-colors">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A]">Booking Details</h3>
              <button onClick={() => setSelected(null)} className="w-8 h-8 bg-light-gray rounded-full flex items-center justify-center text-sm hover:bg-border transition-colors">✕</button>
            </div>
            <div className="text-center mb-5">
              <div className="text-5xl mb-2">{selected.serviceIcon}</div>
              <h4 className="font-playfair text-xl font-bold">{selected.serviceName}</h4>
            </div>
            <div className="bg-cream rounded-2xl p-5 space-y-3">
              {[
                ['Booking ID', selected.id],
                ['Duration', selected.duration],
                ['Division', selected.division],
                ['District', selected.district],
                ['City', selected.city],
                ['Area', selected.area || '—'],
                ['Address', selected.address],
                ['Notes', selected.notes || '—'],
                ['Date', selected.createdAt],
                ['Total', `৳${selected.total.toLocaleString()}`],
                ['Status', selected.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-start text-sm border-b border-light-gray pb-2 last:border-0 last:pb-0">
                  <span className="text-mid-gray shrink-0">{k}</span>
                  <span className="font-semibold text-right ml-4 max-w-[200px] break-words">{v}</span>
                </div>
              ))}
            </div>
            {selected.status === 'Pending' && (
              <button onClick={() => handleCancel(selected.id)} className="w-full mt-4 border border-terracotta text-terracotta py-3 rounded-2xl font-semibold hover:bg-terracotta hover:text-white transition-colors">
                Cancel Booking
              </button>
            )}
            <button onClick={() => setSelected(null)} className="w-full mt-3 bg-sage text-white py-3 rounded-2xl font-semibold hover:bg-sage-dark transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
