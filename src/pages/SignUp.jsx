
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import axios from "axios";
import "./SignUp.css";
import BASE_URL from "../api";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "",
    name: "", 
    surname: "",  
    description: "",  
    price: "", 
    type: "",  
    location: "", 
    image_url: ""  
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

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

    
    if (formValues.role === "trainer") {
      if (!formValues.name) errors.name = "Name is required for Trainer";
      if (!formValues.surname) errors.surname = "Surname is required for Trainer";
      if (!formValues.description) errors.description = "Description is required for Trainer";
      if (!formValues.price) errors.price = "Price is required for Trainer";
      if (!formValues.type) errors.type = "Type is required for Trainer";
      if (!formValues.location) errors.location = "Location is required for Trainer";
      if (!formValues.image_url) errors.image_url = "Image URL is required for Trainer";
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

        const response = await axios.post(`${BASE_URL}/api/auth/register`, formValues);

        console.log("Response:", response); 

        if (response.status === 201) { 
          toast.success(response.data.message || "Registration successful!");

          setFormValues({ 
            username: "", 
            email: "", 
            mobile: "", 
            password: "", 
            confirmPassword: "", 
            role: "", 
            name: "", 
            surname: "", 
            description: "", 
            price: "", 
            type: "", 
            location: "", 
            image_url: "" 
          });

          setFormErrors({}); 

          console.log("Navigating to /trainers..."); 
          setTimeout(() => {
            navigate("/trainers");
          }, 1000); 
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
            type="text"
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
            <option value="">Select Role</option>
            <option value="client">Client</option>
            <option value="trainer">Trainer</option>
          </select>
          {formErrors.role && <span className="error-message">{formErrors.role}</span>}
        </div>

        
        {formValues.role === "trainer" && (
          <>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label>Surname</label>
              <input
                type="text"
                placeholder="Enter your surname"
                name="surname"
                value={formValues.surname}
                onChange={handleInputChange}
              />
              {formErrors.surname && <span className="error-message">{formErrors.surname}</span>}
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                placeholder="Enter your description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
              />
              {formErrors.description && <span className="error-message">{formErrors.description}</span>}
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                placeholder="Enter your price"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
              />
              {formErrors.price && <span className="error-message">{formErrors.price}</span>}
            </div>

            <div className="form-group">
              <label>Type</label>
              <input
                type="text"
                placeholder="Enter your type"
                name="type"
                value={formValues.type}
                onChange={handleInputChange}
              />
              {formErrors.type && <span className="error-message">{formErrors.type}</span>}
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter your location"
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
              />
              {formErrors.location && <span className="error-message">{formErrors.location}</span>}
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                placeholder="Enter your image URL"
                name="image_url"
                value={formValues.image_url}
                onChange={handleInputChange}
              />
              {formErrors.image_url && <span className="error-message">{formErrors.image_url}</span>}
            </div>
          </>
        )}

        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

