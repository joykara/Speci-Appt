import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const passwordRef = useRef();

  // handle submit and show data
  const handleSubmit = (e, values) => {
    e.preventDefault();
    console.log('Form submitted!', values);


    // go to homepage on successful submission
    if (userRef.current.value === 'admin' && passwordRef.current.value === 'admin') {
      console.log('Logged in');
      navigate('/home');
    } else {
      console.log('Wrong username or password');
    }
  };

  return (
    <div className="sp-login">
      <span className="sp-loginTitle">Welcome Back</span>
      <form className="sp-loginForm" onSubmit={handleSubmit}>
        <span><FaUserCircle size={115} color='black' /></span>
        <label>Username</label>
        <input className="sp-loginInput" type="text" placeholder="Enter your username..." ref={userRef} />
        <label>Password</label>
        <input className="sp-loginInput" type="password" placeholder="Enter your password..." ref={passwordRef} />
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