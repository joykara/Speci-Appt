import React, {useState} from 'react';

const SignUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted!');
    };

    return (
        <div className="sp-sign">
            <form id="form" name="myForm" onSubmit={handleSubmit}>
                <h1>Registration Form</h1>
                <p>Please fill in this form to create an account.</p>

                <div className="input-container">
                    <div className="error"></div>
                    <label htmlFor="fname">First Name:</label><br />
                    <input type="text" id="fname" name="fname" placeholder="Enter your first name.." /><br />
                </div>

                <div className="input-container">
                    <div className="error"></div>
                    <label htmlFor="lname">Last Name:</label><br />
                    <input type="text" id="lname" name="lname" placeholder="Enter your last name.." /><br />
                </div>

                <div className="input-container">
                    <div className="error"></div>
                    <label htmlFor="email">Email Address:</label><br />
                    <input type="email" id="email" name="email" placeholder="Enter your email.." /><br />
                </div>

                <div className="input-container">
                    <div className="error"></div>
                    <label htmlFor="phone-number">Phone Number:</label><br />
                    <input type="tel" id="phone-no" name="number" placeholder="Enter your phone number" /><br />
                </div>

                <div className="dob">
                    <label htmlFor="dob">Date of Birth:</label><br />
                    <input type="date" id="dob" name="dob" /><br />
                </div>

                <div className="input-container">
                    <div className="error"></div>
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password" placeholder="Enter your password.." /><br />
                </div>

                <div className="input-container">
                    <div className="error"></div>
                    <label htmlFor="confirm_password">Confirm Password:</label><br />
                    <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm your password.." /><br />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignUp