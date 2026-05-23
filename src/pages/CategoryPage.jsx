import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NotFound from "@/pages/NotFound";
import CategoryHeader from "@/features/products/CategoryHeader/CategoryHeader";
import CategoryFilters from "@/features/products/CategoryFilters";
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
      <Helmet>
        <title>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} | Audiophile</title>
        <meta name="description" content={`Explore our premium range of ${categoryName}. High-fidelity sound and modern design.`} />
      </Helmet>
      <CategoryHeader title={categoryName.toUpperCase()} />
      <CategoryFilters />
      <ProductPreview categoryName={categoryName} />
      <CategorySection />
      <BestGear />
    </>
  );
}

export default CategoryPage;
