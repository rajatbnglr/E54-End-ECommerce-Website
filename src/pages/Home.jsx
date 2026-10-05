import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const handleExplore = () => {

    const loggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (loggedIn) {
      navigate("/products");
    } else {
      navigate("/login");
    }

  };

  return (

    <div className="home">

      <section className="hero">

        <div className="hero-content">

          <p className="welcome-text">
            WELCOME TO SHOPZONE
          </p>

          <h1>
            Shop Smart.
            <br />
            Live Better.
          </h1>

          <p className="hero-description">
            Discover amazing products at great prices.
            Explore our collection and find something
            perfect for you.
          </p>

          <button
            className="shop-button"
            onClick={handleExplore}
          >
            Explore Products →
          </button>

        </div>

        <div className="hero-image">
          🛍️
        </div>

      </section>


      <section className="features">

        <div className="feature-card">

          <div className="feature-icon">
            🚚
          </div>

          <h3>
            Fast Delivery
          </h3>

          <p>
            Get your favourite products delivered quickly.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            🔒
          </div>

          <h3>
            Secure Shopping
          </h3>

          <p>
            Your shopping experience is safe and secure.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            ⭐
          </div>

          <h3>
            Quality Products
          </h3>

          <p>
            Discover products selected for quality and value.
          </p>

        </div>

      </section>


      <section className="home-footer">

        <h2>
          Ready to discover something new?
        </h2>

        <p>
          Explore our collection today.
        </p>

        <button
          className="shop-button"
          onClick={handleExplore}
        >
          Start Shopping →
        </button>

      </section>

      <footer className="footer">

  <div className="footer-content">

    <div>
      <h3>🛍️ ShopZone</h3>

      <p>
        Shop smart. Live better.
      </p>
    </div>

    <div>
      <h4>Quick Links</h4>

      <p>Home</p>
      <p>Products</p>
      <p>Login</p>
    </div>

    <div>
      <h4>Contact</h4>

      <p>support@shopzone.com</p>
      <p>+91 98765 43210</p>
    </div>

  </div>

  <div className="footer-bottom">
    © 2026 ShopZone. All rights reserved.
  </div>

</footer>

    </div>
    

  );
}

export default Home;