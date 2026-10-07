
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:8080"
        }/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username,
            password
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          "Invalid username or password"
        );
      }

      const data =
        await response.json();

      localStorage.setItem(
        "adminToken",
        data.token
      );

      localStorage.setItem(
        "adminUsername",
        data.username
      );

      localStorage.setItem(
        "adminRole",
        data.role
      );

      navigate("/admin");

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          A
        </div>

        <div className="login-header">

          <h1>
            Admin Login
          </h1>

          <p>
            Sign in to manage your enquiries
          </p>

        </div>


        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <div className="login-field">

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />

          </div>


          <div className="login-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>


        <div className="login-footer">
          <span>
            Secure administrator access
          </span>
        </div>

      </div>

    </div>
  );
}

export default AdminLogin;

