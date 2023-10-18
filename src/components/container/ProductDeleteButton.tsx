import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useGetWishlists } from "../../pages/ProductDetailPage";

// Define the props for the ProductDeleteButton component.
interface ProductDeleteButtonProps {
  id: number; // The ID of the product to be deleted.
}

// Define the ProductDeleteButton component.
export function ProductDeleteButton({ id }: ProductDeleteButtonProps) {
  // Create a ref for the select element.
  const select = useRef<HTMLSelectElement>(null);

  // Fetch the wishlists data using a custom hook.
  const { data, error, isLoading } = useGetWishlists();

  // Handle different loading and error states.
  if (error) return <span>Oops, an error occurred!</span>;
  if (isLoading) return <span>Loading...</span>;
  if (!data) return null;

  // Function to delete a product from a wishlist.
  const deleteWishlist = () => {
    // Log the selected value from the ref (if needed).
    console.log(select.current?.value);

    // Fetch data from the server and update the wishlist.
    fetch(`http://localhost:3000/wishlists/`)
      .then((response) => response.json())
      .then((data: GetDeleteReturnType) => {
        // Perform a PUT request to update the wishlist by filtering out the product with the given ID.
        return fetch(`http://localhost:3000/wishlists/`, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ ...data, products: data.products.filter(p => p.id !== id) }),
        });
      });
  }

  // Render the ProductDeleteButton component.
  return (
    <div className="wishlist-wrapper" onClick={(e) => e.stopPropagation()}>
      <button
        className="wishlist-icon"
        onClick={deleteWishlist}
      >
        <FontAwesomeIcon
          icon={faTrash}
          size="lg"
        />
      </button>
    </div>
  );
}
