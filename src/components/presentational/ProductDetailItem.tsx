export interface ProductDetailItemPresentationalProps {
  id: number;
  name: string;
  brand: string;
  category: string;
  imageSrc: string;
  imageAltText?: string;
  specifications: ProductDetailItemSpecifications;
}

export interface ProductDetailItemSpecifications {
  [key: string]: string;
}

export function ProductDetailItemPresentational({ id, name, brand, category, imageSrc, imageAltText, specifications} : ProductDetailItemPresentationalProps) {

  return (
    <li className="list-group-item">
      <img className="product-image" src={ imageSrc } alt={ imageAltText } />
      <div className="product-info">
        <div className="product-info-column">
          <div className="product-name">{ name }</div>
          <div className="product-brand">Brand: { brand }</div>
          <div className="product-category">Caregory: { category }</div>
          <div className="product-specifications">
            Specifications:
            <ul className="specifications-list">
              {Object.keys(specifications).map((key) => (
                <li key={key}>
                  {key}: {specifications[key]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  )
}


