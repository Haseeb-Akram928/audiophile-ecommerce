import BestGear from "@/components/ui/BestGear/BestGear";
import CategorySection from "@/components/ui/CategorySection/CategorySection";
import ProductDetail from "@/features/products/ProductDetail/ProductDetail";

function ProductDetailPage() {
  return (
    <>
      <ProductDetail />
      <CategorySection />
      <BestGear />
    </>
  );
}
export default ProductDetailPage;
