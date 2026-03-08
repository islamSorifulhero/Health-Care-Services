'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking } from '@/types';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  cancelBooking: (id: string) => void;
  getUserBookings: (email: string) => Booking[];
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('care_bookings');
    if (stored) {
      try { setBookings(JSON.parse(stored)); } catch {}
    }
  }, []);

  const persist = (bks: Booking[]) => {
    setBookings(bks);
    localStorage.setItem('care_bookings', JSON.stringify(bks));
  };

  const addBooking = (b: Booking) => persist([...bookings, b]);

  const cancelBooking = (id: string) =>
    persist(bookings.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b)));

  const getUserBookings = (email: string) => bookings.filter((b) => b.userEmail === email);

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, getUserBookings }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookings must be used within BookingProvider');
  return ctx;
}
