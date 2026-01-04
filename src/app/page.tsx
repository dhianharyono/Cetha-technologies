import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
