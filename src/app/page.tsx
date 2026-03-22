import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CtaBanner } from '@/components/home/CtaBanner';

export const metadata: Metadata = {
  title: 'Health-Care – Trusted Baby & Elderly Care Services in Bangladesh',
  description:
    'Find reliable, background-verified caretakers for your children, elderly parents, or sick family members. Book easily and securely with Health-Care.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
