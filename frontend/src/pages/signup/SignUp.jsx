import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './signup.css';

const SignUp = () => {

    const userRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();
    const dobRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted!');
    };

    return (
        <div className="sp-sign">
            <span className="sp-signTitle">Sign Up</span>
            <form className="sp-signForm" onSubmit={handleSubmit}>
                <span><FaUserCircle size={115} color='black' /></span>

                <label>Username</label>
                <input className="sp-signInput" type="text" placeholder="Enter your username..." ref={userRef} />

                <label>Email</label>
                <input className="sp-signInput" type="email" placeholder="Enter your email..." ref={emailRef} />

                {/* contact */}
                <label>Contact</label>
                <input className="sp-signInput" type="text" placeholder="Enter your contact..." ref={contactRef} />

                {/* dob */}
                <label title='date'>Date of Birth</label>
                <input className="sp-signInput" type="date" ref={dobRef} />

                <label>Password</label>
                <input className="sp-signInput" type="password" placeholder="Enter your password..." ref={passwordRef} />

                <label>Confirm Password</label>
                <input className="sp-signInput" type="password" placeholder="Confirm your password..." ref={confirmPasswordRef} />

                <button className="light-button" type="submit">
                    Sign In
                </button>
            </form>
            <Link to={'/login'}>
                <button className="sp-registerButton">Have an account? Login </button>
            </Link>
        </div>
    );
}

export default SignUp