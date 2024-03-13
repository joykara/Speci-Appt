import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './login.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../utils/config';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });

  // handle submit and show data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading())
      const response = await axios.post(`${BASE_URL}/user/login`, values);
      dispatch(hideLoading());
      if (response.data.success) { // Redirect to homepage after successful registration
        toast.success(response.data.msg);
        localStorage.setItem('token', response.data.token);
        setTimeout(() => navigate('/'), 1000);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('An error occurred while signing up');
    }
  };

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="sp-login">
      <span className="sp-loginTitle">Welcome Back</span>
      <form className="sp-loginForm" onSubmit={handleSubmit}>
        <span><FaUserCircle size={115} color='black' /></span>
        <label>Email</label>
        <input className="sp-loginInput" type="text" name="email" placeholder="Enter your email..." value={values.email} onChange={handleChange} />
        <label>Password</label>
        <input className="sp-loginInput" type="password" name="password" placeholder="Enter your password..." value={values.password} onChange={handleChange} />
        <button className="light-button" type="submit">
          Login
        </button>
      </form>
      <Link to={'/sign-up'}>
        <button className="sp-registerButton">Sign Up</button>
      </Link>
    </div>
  );
};

export default Login;