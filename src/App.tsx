import './styles/App.css'
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import WishlistPage from "./pages/WishlistPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/products" element={ <ProductPage /> } />
        <Route path="/wishlists" element={ <WishlistPage /> } />
        <Route path="/products/:productId" element={ <ProductDetailPage /> } />
      </Routes>
    </div>
  )
}

export default App
