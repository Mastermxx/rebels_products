import { WishlistItemPresentational } from "../presentational/WishlistItem";
import { useGetWishListById } from "../../pages/ProductDetailPage";

interface WishlistListItemProps {
  id: number;
}

export interface GetWishlistReturnType {
  id: number;
  name: string;
  products: number[];
}

export function WishlistItem({ id }: WishlistListItemProps) {
  // Fetch wishlist data by ID using a custom hook.
  const { data, error, isLoading } = useGetWishListById(id);

  // Handle different loading and error states.
  if (error) return <span>Oops, an error occurred!</span>; // Handle error state.
  if (isLoading) return <span>Loading...</span>; // Display loading state.
  if (!data || !Object.keys(data).length) return null; // Return null if no data is available.

  return (
    <WishlistItemPresentational
      id={id}
      name={data.name}
      products={data.products}
    />
  );
}
