import TopNav from "../../components/landing/TopNav";
import TickerStrip from "../../components/landing/TickerStrip";
import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import HowItWorksSection from "../../components/landing/HowItWorksSection";
import StatsSection from "../../components/landing/StatsSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import SubscribeSection from "../../components/landing/SubscribeSection";
import Footer from "../../components/landing/Footer";

const Landing = () => {
  return (
    <div id="top" className="min-h-screen bg-ice-50 font-body">
      <TopNav />
      <main>
        <HeroSection />
        <TickerStrip />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <SubscribeSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
