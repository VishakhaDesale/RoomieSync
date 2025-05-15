import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./LoginPage.css";
import { GradientLight } from "../design/Benefits";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const loginData = { username, password };

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.userId);


        navigate(`/dashboard/${data.userId}`);
      } else {
        const errorData = await response.text();
        setError(errorData || "Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page h-[90vh]">
      <GradientLight />

      <div className="login-container">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="link">
          Dont have an account?{" "}
          <Link id="link" to="/api/auth/register">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
