import BestGear from "@/ui/BestGear";
import CategorySection from "@/ui/CategorySection";
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
