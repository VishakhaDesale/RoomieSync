/* eslint-disable react/no-unescaped-entities */
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


// import "./LoginPage.css"; // Optional: You can add a CSS file for styling

const LoginPage = () => {
  const [username, setUsername] = useState(""); // Changed from email to username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New: Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear any previous errors

    const loginData = { username, password }; // Changed email to username

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        // `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login success:", data); // Check the successful response data
        navigate("/");
      } else {
        const errorData = await response.text(); // Capture the raw error message
        console.error("Login error:", errorData);
        setError(errorData || "Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>} {/* Display error */}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>{" "}
          {/* Changed label to Username */}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Changed email to username
            required
            disabled={loading} // Disable input during loading
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
            disabled={loading} // Disable input during loading
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p> Don't have an account? <Link to="/api/auth/register">Register here</Link></p>
    </div>
  );
};

export default LoginPage;
