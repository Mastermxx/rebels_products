import { useParams } from "react-router-dom";
import { ProductDetailItemPresentational } from "../components/presentational/ProductDetailItem";
import useSWR from "swr";
import { GetProductReturnType } from "../components/container/ProductListItem";
import { GetWishlistReturnType } from "../components/container/WishlistItem";

const rootUrl = 'http://localhost:3000';
export const wishlistsUrl = (id: number | string) => `${rootUrl}/wishlists/${id}`;

// Custom hook to fetch product data by ID.
export const useGetProductById = (id?: number | string) => useSWR<GetProductReturnType>(
  id ? `${rootUrl}/products/${id}` : null,
  fetcher
);

// Custom hook to fetch wishlist data by ID.
export const useGetWishListById = (id?: number | string) => useSWR<GetWishlistReturnType>(
  id ? `${rootUrl}/wishlists/${id}` : null,
  fetcher
);

// Custom hook to fetch a list of wishlists.
export const useGetWishlists = () => useSWR<GetWishlistReturnType[]>(`${rootUrl}/wishlists`, fetcher);

// Define a fetcher function for useSWR.
const fetcher = (url: string) => fetch(url)
  .then(response => response.json());

function ProductDetailPage() {
  // Extract the 'productId' from the route parameters.
  const { productId } = useParams<{ productId: string }>();

  // Fetch product data by ID using the custom hook.
  const { data, error, isLoading } = useGetProductById(productId);

  if (!productId) return <span>Not a product.</span>;
  if (error) return <span>Oops, an error occurred!</span>;
  if (isLoading) return <span>Loading...</span>;
  if (!data) return null;

  return (
    <div className="page detailed-page">
      <ProductDetailItemPresentational
        id={parseInt(productId, 10)}
        brand={data.brand}
        imageSrc={data.image}
        name={data.name}
        category={data.category}
        specifications={data.specifications}
      />
    </div>
  );
}

export default ProductDetailPage;
