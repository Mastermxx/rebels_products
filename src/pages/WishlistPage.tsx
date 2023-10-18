import { useState } from "react";
import { GetWishlistReturnType, WishlistItem } from "../components/container/WishlistItem";
import { useGetWishlists } from "./ProductDetailPage";
import { mutate } from "swr";

function WishlistPage() {
  // State to hold the new wishlist name.
  const [newName, setNewName] = useState("");

  function addWishlist() {
    // Fetch the list of wishlists to determine the new wishlist ID.
    fetch(`http://localhost:3000/wishlists`)
      .then((response) => response.json())
      .then((data: GetWishlistReturnType[]) => {
        // Create a new wishlist with a unique ID and an empty products array.
        return fetch(`http://localhost:3000/wishlists`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: newName,
            products: [],
            id: (Math.max(...data.map((d) => d.id)) || 0) + 1,
          }),
        }).then(() => {
          // Refresh the wishlist data after adding a new wishlist.
          mutate(`http://localhost:3000/wishlists`);
          setNewName("");
        });
      });
  }

  // Fetch the list of wishlists using a custom hook.
  const { data, error, isLoading } = useGetWishlists();

  if (error) return <span>Oops, an error occurred!</span>;
  if (isLoading) return <span>Loading...</span>;
  if (!data) return null;

  return (
    <div className="page">
      <h2>Wishlists</h2>
      <input
        type="text"
        className="input"
        placeholder="Enter wishlist name"
        value={newName}
        onChange={(e) => setNewName(e.currentTarget.value)}
      />
      <button className="button" onClick={() => addWishlist()}>
        Add wishlist
      </button>
      <ul className="list-group">
        {data.map((wishlist) => (
          <WishlistItem key={wishlist.id} id={wishlist.id} />
        ))}
      </ul>
    </div>
  );
}

export default WishlistPage;
