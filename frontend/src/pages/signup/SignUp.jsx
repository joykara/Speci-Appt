import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import './signup.css';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../utils/config';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contact: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post(`${BASE_URL}/user/register`, formData);
      if (response.data.success) {
        window.location.replace('/'); // Redirect to homepage after successful registration
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error('An error occurred while signing up');
    }
  };

  return (
    <div className="sp-sign">
      <span className="sp-signTitle">Sign Up</span>
      <form className="sp-signForm" onSubmit={handleSubmit}>
        <span>
          <FaUserCircle size={115} color="black" />
        </span>

        <label>Username</label>
        <input
          className="sp-signInput"
          type="text"
          name="username"
          placeholder="Enter your username..."
          value={formData.username}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          className="sp-signInput"
          type="email"
          name="email"
          placeholder="Enter your email..."
          value={formData.email}
          onChange={handleChange}
        />

        {/* contact */}
        <label>Contact</label>
        <input
          className="sp-signInput"
          type="text"
          name="contact"
          placeholder="Enter your contact..."
          value={formData.contact}
          onChange={handleChange}
        />

        {/* dob */}
        <label title="date">Date of Birth</label>
        <input
          className="sp-signInput"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          className="sp-signInput"
          type="password"
          name="password"
          placeholder="Enter your password..."
          value={formData.password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          className="sp-signInput"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password..."
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button className="light-button" type="submit">
          Sign In
        </button>
      </form>
      <Link to={'/'}>
        <button className="sp-registerButton">Have an account? Login </button>
      </Link>
    </div>
  );
};

export default SignUp;
