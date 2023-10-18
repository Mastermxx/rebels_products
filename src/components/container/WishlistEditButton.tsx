import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { GetWishlistReturnType } from "./WishlistItem";

interface ProductWishlistButtonProps {
  id: number;
}

export function WishlistEditButton({ id }: ProductWishlistButtonProps) {
  // Function to edit the wishlist by adding a product with the given ID.
  const editWishlist = (productId: number) => {
    // Fetch the existing wishlist data for the given ID.
    fetch(`http://localhost:3000/wishlists/${id}`)
      .then((response) => response.json())
      .then((data: GetWishlistReturnType) => {
        // Perform a PUT request to update the wishlist by adding the product with the given ID.
        return fetch(`http://localhost:3000/wishlists/${id}`, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ ...data, products: [...data.products, id] }),
        });
      });
  }

  return (
    <div className="wishlist-icon">
      <FontAwesomeIcon
        icon={faHeart}
        size="lg"
        onClick={() => editWishlist(id)}
      />
    </div>
  );
}
