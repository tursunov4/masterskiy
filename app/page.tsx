import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSlider from "@/components/HeroSlider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AboutSection from "@/components/sections/AboutSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import NaturalStoneSections from "@/components/sections/NaturalStoneSections";
import OnyxSection from "@/components/sections/OnyxSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";

const page = () => {
  return (
    <div>
      <Header />
      <HeroSlider />
      <FeaturedProducts />
      <OnyxSection />
      <NaturalStoneSections />
      <AboutSection />
      <WhyChooseUsSection />
      <EcosystemSection />

      <Footer />
    </div>
  );
};

export default page;
