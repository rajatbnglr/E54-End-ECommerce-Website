import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await axios.post(
        ${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password
        }
      );

      if (response.status === 200) {

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("userName", response.data.name);

        navigate("/products");
      }

    } catch (error) {

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to connect to server");
      }

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          🛍️
        </div>

        <h1>Welcome Back!</h1>

        <p className="login-subtitle">
          Login to continue shopping
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="signup-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Create Account
          </span>
        </p>

      </div>

    </div>

  );
}

export default Login;