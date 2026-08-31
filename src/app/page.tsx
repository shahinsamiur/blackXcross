import Header from "../components/Header";
import Hero from "../components/Hero";
import LogoTicker from "../components/LogoTicker";
import Mission from "../components/Mission";
import BentoFeatures from "../components/BentoFeatures";
import FeatureTabs from "../components/FeatureTabs";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Blog from "../components/Blog";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Proxcy from "../components/ProxyProductsTabs";
export default function Home() {
  return (
    <main className="min-h-screen  bg-[#f0efe3]">
      <Header />
      <Hero />

      <div className="mx-auto container">
        <LogoTicker />
        <Proxcy />
        <Mission />
        <div id="product">
          <BentoFeatures />
          <FeatureTabs />
        </div>
        <Pricing />
        <Testimonials />
        <FAQ />
        <Blog />
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
