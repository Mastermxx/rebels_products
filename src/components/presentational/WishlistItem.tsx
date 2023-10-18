import { useState } from "react";
import { ProductListItem } from "../container/ProductListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { GetWishlistReturnType } from "../container/WishlistItem";
import { mutate } from "swr";

export interface WishlistPresentationalProps {
  id: number;
  name: string;
  products: number[];
}

export function WishlistItemPresentational({ id, name, products }: WishlistPresentationalProps) {
  const [editActive, setEditActive] = useState(false);
  const [newName, setNewName] = useState("");

  // Function to delete a wishlist.
  function deleteWishlistItem() {
    console.log("delete");
    fetch(`http://localhost:3000/wishlists/${id}`, {
      method: "DELETE",
    }).then(() => {
      // Refresh the wishlist data after deleting a wishlist.
      mutate(`http://localhost:3000/wishlists`);
    });
  }

  // Function to update a wishlist.
  function updateWishlistItem() {
    console.log("update");
    fetch(`http://localhost:3000/wishlists/${id}`)
      .then((response) => response.json())
      .then((data: GetWishlistReturnType) => {
        return fetch(`http://localhost:3000/wishlists/${id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ ...data, name: newName }),
        }).then(() => {
          // Refresh the updated wishlist data after the update.
          mutate(`http://localhost:3000/wishlists/${id}`);
          setEditActive(false);
        });
      });
  }

  return (
    <li key={id} className="wishlist-group-item">
      {editActive ? (
        <div className="edit-input">
          <input
            type="text"
            className="input"
            onChange={(e) => setNewName(e.currentTarget.value)}
            placeholder={name}
          />
          <div className="button-wrapper">
            <button className="button delete" onClick={() => deleteWishlistItem()}>
              Delete
            </button>
            <button className="button save" onClick={() => updateWishlistItem()}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="title-wrapper">
          <h2>{name}</h2>
          <button className="button" onClick={() => setEditActive((s) => !s)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
      )}
      {
        <ul className="product-list">
          {products.length ? (
            products.map((id) => <ProductListItem key={id} id={id} />)
          ) : (
            <li className="helper-text">This list is empty</li>
          )}
        </ul>
      }
    </li>
  );
}
