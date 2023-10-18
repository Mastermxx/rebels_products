import { ProductListItemPresentational } from "../presentational/ProductListItem";
import { useGetProductById } from "../../pages/ProductDetailPage";

interface ProductListItemProps {
  id: number;
}

export interface GetProductReturnType {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;
  specifications: ProductSpecifications;
}

export interface ProductSpecifications {
  processor: string;
  ram: string;
  storage: string;
}

export function ProductListItem({ id }: ProductListItemProps) {
  // Fetch product data by ID using a custom hook.
  const { data, error, isLoading } = useGetProductById(id);

  // Handle different loading and error states.
  if (!id) return <span>Not a product.</span>;
  if (error) return <span>Oops, an error occurred!</span>;
  if (isLoading) return <span>Loading...</span>;
  if (!data) return null;

  return (
    <ProductListItemPresentational
      id={data.id}
      name={data.name}
      brand={data.brand}
      imageSrc={data.image}
    />
  );
}
