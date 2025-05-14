// app/locations/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { locations } from '@/lib/locations';
import { fetchCollectionProducts } from '@/lib/fetchCollectionProducts';
import LocationHero from '@/components/ui/sections/LocationHero';
import BikeRental from '@/components/ui/sections/BikeRental';

export default async function LocationPage(
  { params }: { params: { slug: string } },
) {
  const slug = params.slug as keyof typeof locations;
  const location = locations[slug];

  if (!location) return notFound();

  const products = await fetchCollectionProducts(location.collection ?? '');

  return (
    <>
      <LocationHero
        headline={location.headline}
        subtext={location.description}
        image={location.image}
      />
      <BikeRental products={products} />
    </>
  );
}
