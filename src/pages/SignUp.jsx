
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignUp.css";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "",
    name: "",  // For Trainer
    surname: "",  // For Trainer
    description: "",  // For Trainer
    price: "",  // For Trainer
    type: "",  // For Trainer
    location: "",  // For Trainer
    img_url: ""  // For Trainer
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false); 

  const validateForm = () => {
    const errors = {};

    if (!formValues.username) {
      errors.username = "Username is required";
    } else if (!/^[A-Za-z0-9_]{3,15}$/.test(formValues.username)) {
      errors.username =
        "Username should be 3-15 characters long and can only contain letters, numbers, and underscores.";
    }

    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formValues.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formValues.mobile)) {
      errors.mobile = "Mobile number should be 10 digits";
    }

    if (!formValues.password) {
      errors.password = "Password is required";
    }

    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formValues.role) {
      errors.role = "Role is required";
    }

    // Additional validation for Trainer fields
    if (formValues.role === "trainer") {
      if (!formValues.name) errors.name = "Name is required for Trainer";
      if (!formValues.surname) errors.surname = "Surname is required for Trainer";
      if (!formValues.description) errors.description = "Description is required for Trainer";
      if (!formValues.price) errors.price = "Price is required for Trainer";
      if (!formValues.type) errors.type = "Type is required for Trainer";
      if (!formValues.location) errors.location = "Location is required for Trainer";
      if (!formValues.img_url) errors.img_url = "Image URL is required for Trainer";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true); 

        const response = await axios.post("http://localhost:5000/users", formValues); // Adjust the URL if needed

        if (response.data.success) {
          toast.success(response.data.message || "Registration successful!");
          setFormValues({ username: "", email: "", mobile: "", password: "", confirmPassword: "", role: "", name: "", surname: "", description: "", price: "", type: "", location: "", img_url: "" });
          setFormErrors({});
        } else {
          toast.error(response.data.message || "Registration failed!");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong. Please try again later.");
      } finally {
        setLoading(false); 
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
          />
          {formErrors.username && <span className="error-message">{formErrors.username}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        </div>

        <div className="form-group">
          <label>Mobile No</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formValues.mobile}
            onChange={handleInputChange}
          />
          {formErrors.mobile && <span className="error-message">{formErrors.mobile}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          {formErrors.password && <span className="error-message">{formErrors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
          />
          {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formValues.role}
            onChange={handleInputChange}
          >
            <option value="select-role">Select role</option>
            <option value="trainer">Trainer</option>
            <option value="client">Client</option>
          </select>
          {formErrors.role && <span className="error-message">{formErrors.role}</span>}
        </div>

        {/* Show Trainer specific fields if role is "trainer" */}
        {formValues.role === "trainer" && (
          <>
            <div className="form-group">
              <label>Trainer Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formValues.name}
                onChange={handleInputChange}
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label>Trainer Surname</label>
              <input
                type="text"
                name="surname"
                placeholder="Enter your surname"
                value={formValues.surname}
                onChange={handleInputChange}
              />
              {formErrors.surname && <span className="error-message">{formErrors.surname}</span>}
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Describe yourself as a trainer"
                value={formValues.description}
                onChange={handleInputChange}
              />
              {formErrors.description && <span className="error-message">{formErrors.description}</span>}
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter your price"
                value={formValues.price}
                onChange={handleInputChange}
              />
              {formErrors.price && <span className="error-message">{formErrors.price}</span>}
            </div>

            <div className="form-group">
              <label>Type</label>
              <input
                type="text"
                name="type"
                placeholder="Enter your type (e.g., fitness, yoga)"
                value={formValues.type}
                onChange={handleInputChange}
              />
              {formErrors.type && <span className="error-message">{formErrors.type}</span>}
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter your location"
                value={formValues.location}
                onChange={handleInputChange}
              />
              {formErrors.location && <span className="error-message">{formErrors.location}</span>}
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="img_url"
                placeholder="Enter your image URL"
                value={formValues.img_url}
                onChange={handleInputChange}
              />
              {formErrors.img_url && <span className="error-message">{formErrors.img_url}</span>}
            </div>
          </>
        )}

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p style={{ textAlign: "center" }}>
        Already have an account?{" "}
        <Link
          to="/login"
          className="toggle-link"
          style={{ color: "#007BFF", textDecoration: "underline" }}
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
