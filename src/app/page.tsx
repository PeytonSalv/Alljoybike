import FAQ from '@/components/ui/sections/FAQ';
import Hero from '@/components/ui/sections/Hero';
import Locations from '@/components/ui/sections/Locations';
import WhyChooseUs from '@/components/ui/sections/WhyChooseUs';
import ContactForm from '@/components/ui/sections/ContactForm';
export default function Home() {
  return (
    <>
      <Hero />
      <Locations />
      <WhyChooseUs />
      <FAQ />
      <ContactForm />
    </>
  );
}