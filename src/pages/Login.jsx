
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignUp.css";
import { jwtDecode } from 'jwt-decode'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  
  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    try {
      setLoading(true); 
      
      
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      
      if (response.data.token) {
        toast.success("Login successful!");

        const token = response.data.token;
        sessionStorage.setItem("authToken", token);

        
        try {
          const user = jwtDecode(token);
          console.log(user);
          sessionStorage.setItem("user", user.role);
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError);
          toast.error("Error decoding token.");
        }

        console.log("Token saved:", token);

        
        navigate('/login');
      } else {
        toast.error("Login failed: No token received.");
      }
    } catch (error) {
      console.error("Error during login:", error);

      
      if (error.response) {
        
        toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
      } else if (error.request) {
        
        toast.error("No response from server. Please try again later.");
      } else {
        
        toast.error("Something went wrong during login.");
      }
    } finally {
      setLoading(false); 
    }
  };

  
  const handleLogout = () => {
    sessionStorage.removeItem("authToken")
    sessionStorage.removeItem("user") 
    toast.success("Logout successful!"); 
    navigate("/"); 
  };

  
  const isLoggedIn = sessionStorage.getItem("authToken");

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="toggle-link"
              style={{ color: "#007BFF", textDecoration: "underline" }}
            >
              Sign Up
            </Link>
          </p>
        </>
      ) : (
        <div>
          <h2>You are logged in</h2>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
