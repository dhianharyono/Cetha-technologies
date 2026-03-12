import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import ServiceSteps from "@/components/ServiceSteps";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Spotlight from "@/components/Spotlight";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Spotlight />
      <Navbar />
      <Hero />
      <WhyUs />
      {/* <Services /> */}
      <ServiceSteps />
      <Portfolio />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
