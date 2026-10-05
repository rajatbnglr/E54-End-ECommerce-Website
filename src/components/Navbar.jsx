import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        🛍️ <span>ShopZone</span>
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        {isLoggedIn && (
          <Link to="/products">
            Products
          </Link>
        )}

        {!isLoggedIn ? (
          <Link
            to="/login"
            className="nav-login"
          >
            Login
          </Link>
        ) : (
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;