import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import CategoryHeader from "@/features/products/CategoryHeader/CategoryHeader";
import ProductPreview from "@/features/products/ProductPreview/ProductPreview";
import CategorySection from "@/components/ui/CategorySection/CategorySection";
import BestGear from "@/components/ui/BestGear/BestGear";

function CategoryPage() {
  const { categoryName } = useParams();
  const validCategories = ["headphones", "speakers", "earphones"];

  if (!validCategories.includes(categoryName.toLowerCase())) {
    return <NotFound />;
  }
  return (
    <>
      <CategoryHeader title={categoryName.toUpperCase()} />
      <ProductPreview categoryName={categoryName} />
      <CategorySection />
      <BestGear />
    </>
  );
}

export default CategoryPage;
