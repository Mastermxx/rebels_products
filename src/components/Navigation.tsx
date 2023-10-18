import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
      <>
        <nav className="navigation-bar">
          <NavLink className="nav-button" to="/">Home</NavLink>
          <NavLink className="nav-button" to="/products">Products</NavLink>
          <NavLink className="nav-button" to="/wishlists">Wishlist</NavLink>
        </nav>
      </>
  );
}

export default Navigation;
