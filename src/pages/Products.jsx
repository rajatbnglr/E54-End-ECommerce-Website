import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
    const navigate = useNavigate();

    useEffect(() => {

  const loggedIn = localStorage.getItem("isLoggedIn");

  if (loggedIn !== "true") {
    navigate("/login");
  }

}, [navigate]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();

      })
      .then((data) => {

        setProducts(data);
        setLoading(false);

      })
      .catch((error) => {

        console.log(error);
        setError("Unable to load products.");
        setLoading(false);

      });

  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-page">
        <h2>{error}</h2>
      </div>
    );
  }

  return (

    <div className="products-page">

      <div className="products-header">

        <p className="products-label">
          SHOPZONE COLLECTION
        </p>

        <h1>
          Discover Our Products
        </h1>

        <p>
          Find something you'll love from our collection.
        </p>

      </div>

      <div className="products-grid">

        {products.map((product) => (

          <div
            className="product-card"
            key={product.id}
          >

            <div className="product-image-container">

              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />

            </div>

            <div className="product-info">

              <p className="product-category">
                {product.category}
              </p>

              <h2 className="product-title">
                {product.title}
              </h2>

              <div className="product-rating">
                ⭐ {product.rating.rate}
                <span>
                  ({product.rating.count})
                </span>
              </div>

              <div className="product-bottom">

                <p className="product-price">
                  ${product.price}
                </p>

                <button className="cart-button">
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Products;