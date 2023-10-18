import GetProducts from "../components/GetProducts";
import {SearchBar} from "../components/Searchbar";

function ProductPage() {
  return (
    <div className="page product-page">
      <SearchBar />
      <GetProducts />
    </div>
  );
}

export default ProductPage;
