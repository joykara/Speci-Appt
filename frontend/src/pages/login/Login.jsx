import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import './login.css';
// import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhoneVolume } from 'react-icons/fa';
// import { MdLocationOn } from 'react-icons/md';
// import emailjs from 'emailjs-com';
// import axios from 'axios';
// import { BASE_URL } from '../../utils/config';

const Login = () => {

  // Ref for the form
  const form = useRef();

  // handle submit and set up email.js
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!');
};


  return (
    <div className="sp-login">
      <span className="sp-loginTitle">Login</span>
      <form className="sp-loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="sp-loginInput" type="text" placeholder="Enter your username..." ref={userRef} />
        <label>Password</label>
        <input className="sp-loginInput" type="password" placeholder="Enter your password..." ref={passwordRef}/>
        <button className="light-button" type='submit' >Login</button>
      </form>
        <Link to={'/'}><button className="sp-loginRegisterButton">Sign Up</button></Link>
    </div>
  )
}

export default Login;
