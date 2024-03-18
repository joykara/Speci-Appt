import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const ApplyDoctor = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    department: '',
    specialty: '',
    location: '',
    availability: ''
  });

  const { firstName, lastName, contact, email, department, specialty, location, availability } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/doctors/register`, formData);
      // Redirect or show success message
    } catch (error) {
      console.error('Error applying a doctor:', error);
      // Show error message
    }
  };

  return (
    <>
        <div className="sp-main">
            <Navbar />
            <div className="apply-doctor">
              <h2>Apply Doctor</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={handleChange} required />
                <input type="text" name="contact" placeholder="Contact" value={contact} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
                <input type="text" name="department" placeholder="Department" value={department} onChange={handleChange} required />
                <input type="text" name="specialty" placeholder="Specialty" value={specialty} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" value={location} onChange={handleChange} required />
                <input type="text" name="availability" placeholder="Availability" value={availability} onChange={handleChange} required />
                <button type="submit">Submit Application</button>
              </form>
            </div>
        </div>
    </>
  )
}

export default ApplyDoctor