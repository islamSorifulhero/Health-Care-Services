import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/data/services';
import { ServiceDetailClient } from './ServiceDetailClient';

interface Props {
  params: { serviceId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = SERVICES.find((s) => s.id === params.serviceId);
  if (!service) return { title: 'Service Not Found – Health-Care' };
  return {
    title: `${service.name} – Health-Care`,
    description: service.longDescription,
    openGraph: {
      title: `${service.name} – Health-Care`,
      description: service.description,
    },
  };
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ serviceId: s.id }));
}

export default function ServiceDetailPage({ params }: Props) {
  const service = SERVICES.find((s) => s.id === params.serviceId);
  if (!service) notFound();
  return <ServiceDetailClient service={service} />;
}
