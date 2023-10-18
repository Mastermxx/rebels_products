import { useState, useEffect } from "react";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface WishlistProps {
  id?: number;
  name?: string;
  products: any[];
}

function FetchProducts({}: WishlistProps) {
  const [wishlists, setWishlist] = useState<WishlistProps[]>([]);

  // Use the useEffect hook to fetch wishlists when the component mounts.
  useEffect(() => {
    fetch('http://localhost:3000/wishlists')
      .then((response) => response.json())
      .then((data: WishlistProps[]) => setWishlist(data));
  }, []);

  return (
    <div className="page">
      <h1>Wishlists</h1>
      <button type="button" className="button">Create new wishlist</button>

      <ul className="list-group wishlist">
        {wishlists.map((wishlist) => (
          <li key={wishlist.id} className="list-group-item flex-column">
            <div className="product-name">{wishlist.name}</div>
            <ul className="list-group wishlist">
              {wishlist.products.map((product, index) => (
                <li key={index} className="wishlist-group-item">
                  <div className="flex-centered space-b">{product}</div>
                  <div><FontAwesomeIcon icon={faTrash} size="lg" /></div>
                  <div><FontAwesomeIcon icon={faHeart} size="lg" /></div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchProducts;
