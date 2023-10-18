import { ProductWishlistButton } from "../container/ProductWishlistButton";
import { useNavigate } from "react-router-dom";

interface ProductListItemPresentationalProps {
  id: number;
  brand: string;
  imageSrc: string;
  name: string;
  imageAltText?: string;
}

export function ProductListItemPresentational({ id, brand, imageSrc, imageAltText, name } : ProductListItemPresentationalProps) {
  const navigate = useNavigate();
  function goToDetailedPage() {
    navigate(`/products/${id}`)
  }

  return (
    <>
      <li className="list-group-item" onClick={ goToDetailedPage }>
        <ProductWishlistButton id={ id }/>
        <img className="product-image" src={ imageSrc } alt={ imageAltText } />

        <div className="product-info">
          <br/>
          <div className="product-info-column">
            <div className="product-name">{ name }</div>
            <div className="product-brand">{ brand }</div>
          </div>
        </div>
      </li>
    </>
  )
}


