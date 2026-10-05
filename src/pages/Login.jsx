import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {

  e.preventDefault();

  if (
    email === "test11@gmail.com" &&
    password === "pass123"
  ) {
    setError("");

    localStorage.setItem("isLoggedIn", "true");

    navigate("/products");

  } else {

    setError("Invalid email or password");

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
        <div className="demo-login">
  <strong>Demo Login</strong>
  <br />
  Email: test11@gmail.com
  <br />
  Password: pass123
</div>

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
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );
}

export default Login;