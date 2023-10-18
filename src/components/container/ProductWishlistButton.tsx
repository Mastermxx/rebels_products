import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { GetWishlistReturnType } from "./WishlistItem";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useGetWishlists } from "../../pages/ProductDetailPage";
import { mutate as globalMutate } from "swr";

interface ProductWishlistButtonProps {
  id: number;
}

// Custom hook to fetch and check if a product is in a wishlist
function useGetIsInWishList(id: string | number) {
  const getIsInWishlistQuery = useGetWishlists();

  return {
    ...getIsInWishlistQuery,
    data: getIsInWishlistQuery.data
      ? {
        // Check if the product with the given ID is in any wishlist
        isInWishlist: (getIsInWishlistQuery.data.flatMap((w) => w.products) || []).some(
          (p) => p === id
        ),
        // Filter and retrieve wishlists that contain the product
        wishlists: getIsInWishlistQuery.data.filter((wishlist) =>
          wishlist.products.some((p) => p === parseInt(`${id}`, 10))
        ),
      }
      : undefined,
  };
}

export function ProductWishlistButton({ id }: ProductWishlistButtonProps) {
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const { data, error, isLoading } = useGetWishlists();
  const [selectedWishlistId, setSelectedWishlistId] = useState<number>();
  const getIsInWishlistQuery = useGetIsInWishList(id);

  useEffect(() => {
    if (
      data &&
      data.length &&
      (!selectedWishlistId ||
        !data.some((item) => item.id === selectedWishlistId)
      )
    ) {
      // Initialize the selected wishlist ID if not set
      setSelectedWishlistId(data[0].id);
    }
  }, [data, selectedWishlistId]);

  // Handle various error and loading states
  if (error || getIsInWishlistQuery.error) return <span>Oops, an error occurred!</span>;
  if (isLoading || getIsInWishlistQuery.isLoading) return <span>Loading...</span>;
  if (!data || typeof getIsInWishlistQuery.data === "undefined")
    return <span>Whut, no data?!</span>;

  function handleButton(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    setSelectIsOpen(true);
  }

  // Function to toggle the product in and out of the selected wishlist
  const toggleWishlist = () => {
    if (!selectedWishlistId) {
      console.warn("Tried to access a non-existent wishlist id");
      return;
    }

    console.log("select: ", selectedWishlistId);

    // Fetch the selected wishlist and update it with the product
    fetch(`http://localhost:3000/wishlists/${selectedWishlistId}`)
      .then((response) => response.json())
      .then((data: GetWishlistReturnType) => {
        console.log(
          data.products.some((p) => p === id) ? "removing" : "adding"
        );

        // Update the wishlist on the server
        fetch(`http://localhost:3000/wishlists/${selectedWishlistId}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            ...data,
            products: data.products.some((p) => p === id)
              ? [...data.products.filter((p) => p !== id)]
              : [...data.products, id],
          }),
        }).then(() => {
          console.log("mutate");
          console.log(`http://localhost:3000/wishlists/${selectedWishlistId}`);

          // Trigger a global data mutation to update the UI
          globalMutate(`http://localhost:3000/wishlists/${selectedWishlistId}`);
          globalMutate("http://localhost:3000/wishlists");

          setSelectIsOpen(false); // Close the wishlist popup
        });
      });
  };

  return (
    <div className="wishlist-wrapper" onClick={(e) => e.stopPropagation()}>
      <button
        className={`wishlist-icon ${
          getIsInWishlistQuery.data.isInWishlist ? "active" : ""
        }`}
        onClick={handleButton}
      >
        <FontAwesomeIcon icon={faHeart} size="lg" />
      </button>
      {selectIsOpen && (
        <div className="wishlist-popup">
          <select
            className="select"
            value={selectedWishlistId}
            onChange={(e) =>
              setSelectedWishlistId(parseInt(e.target.value, 10))
            }
          >
            {data.map((wishlist) => (
              <option key={wishlist.id} value={wishlist.id}>
                {getIsInWishlistQuery.data?.wishlists.some((w) => w.id === wishlist.id)
                  ? "Remove from "
                  : "Add to "}
                {wishlist.name}
              </option>
            ))}
          </select>
          <button className="button" onClick={toggleWishlist}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}
