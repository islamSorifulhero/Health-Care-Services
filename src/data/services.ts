// src/data/services.ts
export const SERVICES = [
  {
    id: 'baby-care',
    name: 'Baby Care',
    shortName: 'Babysitting',
    icon: '👪',
    color: '#C4714A',
    bgGradient: 'from-orange-50 to-orange-100',
    cardBg: 'bg-orange-50',
    iconBg: 'bg-orange-100',
    ratePerDay: 1200,
    tag: 'Most Popular',
    tagBg: 'bg-orange-100 text-orange-700',
    accentColor: 'text-terracotta',
    borderColor: 'border-orange-200',
    description:
      'Expert babysitting and child care for infants and toddlers. Our trained caretakers ensure your little ones are safe, happy, and well cared for.',
    longDescription:
      "Our professional baby care specialists are trained in infant CPR, first aid, child development, and early childhood education. They provide engaging activities, maintain feeding schedules, and ensure your baby's emotional and physical needs are fully met with love and expertise.",
    features: [
      { icon: '🍼', title: 'Feeding & Nutrition', desc: 'Scheduled feeding, bottle prep, and age-appropriate nutrition guidance' },
      { icon: '😴', title: 'Sleep Routines', desc: 'Establishing healthy nap schedules and calming bedtime routines' },
      { icon: '🎮', title: 'Developmental Play', desc: 'Age-appropriate stimulating activities for healthy development' },
      { icon: '🏥', title: 'First Aid Certified', desc: 'All caretakers certified in infant CPR and emergency first aid' },
      { icon: '📱', title: 'Real-time Updates', desc: 'Regular photo and video updates throughout the day' },
    ],
    rating: 4.9,
    reviews: 1240,
    includes: ['Feeding support', 'Diaper changing', 'Nap management', 'Play & activities', 'Health monitoring'],
  },
  {
    id: 'elderly-care',
    name: 'Elderly Care',
    shortName: 'Elder Care',
    icon: '👴',
    color: '#7C9A85',
    bgGradient: 'from-sage-light/20 to-sage/20',
    cardBg: 'bg-green-50',
    iconBg: 'bg-green-100',
    ratePerDay: 1500,
    tag: 'Trusted',
    tagBg: 'bg-green-100 text-green-700',
    accentColor: 'text-sage-dark',
    borderColor: 'border-green-200',
    description:
      'Compassionate and dignified care for elderly family members. We ensure their comfort, safety, and emotional wellbeing at home.',
    longDescription:
      'Our elderly care specialists provide comprehensive support for seniors, from daily living assistance to companionship. Trained in geriatric care, they help maintain independence while ensuring safety and dignity for your loved ones in the comfort of their own home.',
    features: [
      { icon: '🚶', title: 'Mobility Assistance', desc: 'Safe movement support and fall prevention strategies at home' },
      { icon: '💊', title: 'Medication Management', desc: 'Timely medication reminders and basic health monitoring' },
      { icon: '🍽️', title: 'Meal Preparation', desc: 'Nutritious, diet-appropriate meals prepared with care daily' },
      { icon: '🤝', title: 'Companionship', desc: 'Emotional support, engaging conversation, and social activities' },
      { icon: '🛁', title: 'Personal Hygiene', desc: 'Respectful and dignified assistance with bathing and grooming' },
    ],
    rating: 4.8,
    reviews: 890,
    includes: ['Daily assistance', 'Medication reminders', 'Meal prep', 'Companionship', 'Health monitoring'],
  },
  {
    id: 'sick-care',
    name: 'Sick People Care',
    shortName: 'Sick Care',
    icon: '🏥',
    color: '#C9A84C',
    bgGradient: 'from-yellow-50 to-yellow-100',
    cardBg: 'bg-yellow-50',
    iconBg: 'bg-yellow-100',
    ratePerDay: 1800,
    tag: 'Specialized',
    tagBg: 'bg-yellow-100 text-yellow-700',
    accentColor: 'text-gold',
    borderColor: 'border-yellow-200',
    description:
      'Specialized home care for patients recovering from illness or surgery. Medically-trained caretakers provide expert post-treatment support.',
    longDescription:
      'Our sick care specialists include trained nursing assistants and healthcare aides who provide professional post-operative and illness recovery support at home. They coordinate with medical teams and ensure proper wound care, medication protocols, and recovery milestones are met.',
    features: [
      { icon: '🩺', title: 'Post-Surgery Care', desc: 'Professional wound care and post-operative recovery monitoring' },
      { icon: '💊', title: 'Medication Administration', desc: 'Correct dosage, timing, and accurate medication tracking' },
      { icon: '📊', title: 'Vital Sign Monitoring', desc: 'Regular blood pressure, temperature, and health checks' },
      { icon: '🧑‍⚕️', title: 'Medical Coordination', desc: 'Effective liaison between family and medical professionals' },
      { icon: '🏡', title: 'Home Recovery', desc: 'Complete recovery support in the comfort of home' },
    ],
    rating: 4.9,
    reviews: 670,
    includes: ['Post-op care', 'Medication tracking', 'Vital monitoring', 'Doctor coordination', 'Recovery support'],
  },
];

export const DIVISIONS: Record<string, string[]> = {
  Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj', 'Manikganj', 'Munshiganj', 'Narsingdi', 'Kishoreganj', 'Tangail', 'Faridpur'],
  Chittagong: ["Chittagong", "Cox's Bazar", 'Comilla', 'Noakhali', 'Feni', 'Lakshmipur', 'Chandpur', 'Brahmanbaria'],
  Rajshahi: ['Rajshahi', 'Bogura', 'Pabna', 'Sirajganj', 'Natore', 'Chapainawabganj', 'Naogaon', 'Joypurhat'],
  Khulna: ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat', 'Narail', 'Magura', 'Chuadanga', 'Meherpur'],
  Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  Barishal: ['Barishal', 'Patuakhali', 'Bhola', 'Jhalokati', 'Pirojpur', 'Barguna'],
  Rangpur: ['Rangpur', 'Dinajpur', 'Kurigram', 'Gaibandha', 'Nilphamari', 'Lalmonirhat', 'Thakurgaon', 'Panchagarh'],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Sherpur', 'Netrokona'],
};

export const DURATION_OPTIONS = [
  { label: '1 Day', days: 1 },
  { label: '3 Days', days: 3 },
  { label: '1 Week', days: 7 },
  { label: '2 Weeks', days: 14 },
  { label: '1 Month', days: 30 },
  { label: 'Custom', days: 0 },
];

export const PLATFORM_FEE = 100;
