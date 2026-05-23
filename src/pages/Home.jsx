import BestGear from "@/components/ui/BestGear/BestGear";
import CategorySection from "@/components/ui/CategorySection/CategorySection";
import FeaturedProducts from "@/features/products/FeaturedProducts/FeaturedProducts";
import Hero from "@/features/products/Hero/Hero";

function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <BestGear />
    </>
  );
}

export default Home;
