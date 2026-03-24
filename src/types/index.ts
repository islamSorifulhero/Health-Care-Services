export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  nid?: string;
  avatar?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceIcon: string;
  userId: string;
  userEmail: string;
  userName: string;
  duration: string;
  days: number;
  division: string;
  district: string;
  city: string;
  area: string;
  address: string;
  notes?: string;
  ratePerDay: number;
  platformFee: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  bgGradient: string;
  cardBg: string;
  iconBg: string;
  ratePerDay: number;
  tag: string;
  tagBg: string;
  accentColor: string;
  borderColor: string;
  description: string;
  longDescription: string;
  features: { icon: string; title: string; desc: string }[];
  rating: number;
  reviews: number;
  includes: string[];
}
