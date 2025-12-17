import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/sections/AboutSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import NaturalStoneSections from "@/components/sections/NaturalStoneSections";
import OnyxSection from "@/components/sections/OnyxSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
const page = () => {
  return (
    <div>
      <HeroSlider />
      <FeaturedProducts />
      <OnyxSection />
      <NaturalStoneSections />
      <AboutSection />
      <WhyChooseUsSection />
      <EcosystemSection />
    </div>
  );
};

export default page;
