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
  // // set up state for form
  // const [formData, setFormData] = useState({
  //   fname: '',
  //   lname: '',
  //   email: '',
  //   password: ''
  // });

  // // destructure form data
  // const { fname, lname, email, password } = formData;

  // // handle change
  // const handleChange = (e) => {
  //   setFormData({...formData, [e.target.name]: e.target.value});
  // }

  // handle submit and set up email.js
  // const handleSubmit= async (e) => {
  //   e.preventDefault();

  //   try {

  //     //use axios to post data
  //     await axios.post(`${BASE_URL}/api/contact`, {
  //       fname: fname,
  //       lname: lname,
  //       email: email,
  //       password: password
  //     })
  //       .then((res) => {
  //         console.log(res.data);
  //         console.log("Contact form saved to database");
  //         alert("Thank you! We will get back to you soon!");

  //         // clear form
  //         setFormData({
  //           fname: '',
  //           lname: '',
  //           email: '',
  //           password: ''
  //         });
  //       })
  //       .catch((error) => {
  //         console.log('Error saving contact form to database', error);
  //       });

  //     // send email
  //     emailjs.sendForm('service_5q3b4qg', 'template_6sp8q6m', form.current, 'user_5k7O7dJ6QwIy3qQJqBjQl')
  //       .then((result) => {
  //           console.log(result.text);
  //       }, (error) => {
  //           console.log(error.text);
  //     });

  //   } catch (error) {

  //   }

  // }


  return (
    <div className="sp-contact-container">
      <div className="sp-contact-header">
        <div className="sp-contact-header-intro">
          <div className="sp-contact-header-info">
            <h1>Let's Collaborate</h1>
            <p>Are you ready to unlock the full potential of your digital presence? Look no further than Ziqweb.We specialize in cutting-edge IT solutions that drive your business forward. Our team of experienced professionals is here to provide you with top-notch IT services tailored to your unique needs.</p>
          </div>
        </div>
        <div className="sp-contact-form">
          <div className="sp-contact-form-header">
            <h1>Make an Inquiry</h1>
            <p>Lorem Ipsum is simply dummy text of the printing .</p>
          </div>
          <div className="sp-contact-form-body">
            <form ref={form} >
              <div className="sp-contact-form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" value={email} placeholder="Enter your email" autoComplete="true" aria-required />
              </div>
              <div className="sp-contact-form-group">
                <label htmlFor="password">Password</label>
                <input name="password" id="password" value={password} placeholder="Enter your password" aria-required />
              </div>
              {/* login submit button */}
              <Link to={'/home'}>
                <button type="submit" className='light-button'>Login</button>
              </Link>
              {/* sign up page button */}
              <Link to={'/sign-up'}>
                <button type="submit" className='light-button'>Sign Up</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
