import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import ServiceSteps from '@/components/ServiceSteps';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Spotlight from '@/components/Spotlight';
import { getPublicTestimonials } from '@/app/actions/userActions';

export default async function Home() {
  const testimonials = await getPublicTestimonials();

  return (
    <main className='min-h-screen'>
      <Spotlight />
      <Navbar />
      <Hero />
      <WhyUs />
      <ServiceSteps />
      <Portfolio />
      <Testimonials testimonials={testimonials} />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
