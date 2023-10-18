import { useState, useEffect } from "react";
import { ProductListItem } from "./container/ProductListItem";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;
  specifications: Record<string, string>;
}

function FetchProducts() {
  // Initialize state variables
  const [products, setProducts] = useState<Product[]>([]);
  const [uniqueProductIds, setUniqueProductIds] = useState<number[]>([]);

  useEffect(() => {
    // Fetch products and wishlists data from the server
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  return (
    <>
      <h1>Products</h1>
      <ul className="list-group">
        {products.map((product) => (
          <ProductListItem key={product.id} id={product.id} />
        ))}
      </ul>
    </>
  );
}

export default FetchProducts;
