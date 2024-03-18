import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { Navbar } from '../../components';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import './doctors.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ApplyDoctor = () => {
  const navigate = useNavigate();
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
  const handleAvailabilityChange = (day, field, value) => {
    setFormData({
      ...formData,
      availability: {
        ...availability,
        [day]: {
          ...availability[day],
          [field]: value
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/doctors/register`, formData);
      // Redirect or show success message
      toast.success("Doctor application submitted successfully!");
      // clear form
      setFormData({
        firstName: '',
        lastName: '',
        contact: '',
        email: '',
        department: '',
        specialty: '',
        location: '',
        availability: ''
      });
      // redirect to doctors
      navigate('/doctors');
    } catch (error) {
      console.error('Error applying a doctor:', error);
      toast.error('Error fetching user data');

    }
  };

  // Options for days of the week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <>
      <div className="sp-doc-main">
        <Navbar />
        <section className="sp-doc-sect">
          <div className="sp-topbar">
            <div className="sp-tp-title">
              <h2>Dashboard</h2>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            <ul className="sp-tp-details">
              <li> <IoMdNotificationsOutline size={35} /> </li>
              <li> <FaUserCircle size={35} color="green" /> </li>
            </ul>
          </div>
            <div className="sp-apply-doctor">
              <h2>Apply Doctor</h2>
              <form onSubmit={handleSubmit}className="sp-hd-docDetails">
                <div className="sp-hd-docDetails-item">
                  <label htmlFor="firstName">First Name:</label>
                  <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={handleChange} required />
                </div>
                <div className="sp-hd-docDetails-item">
                  <label htmlFor="lastName">Last Name:</label>
                  <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={handleChange} required />
                </div>
                <div className="sp-hd-docDetails-item">
                  <label htmlFor="contact">Contact:</label>
                  <input type="text" name="contact" placeholder="Contact" value={contact} onChange={handleChange} required />
                </div>
                <div className="sp-hd-docDetails-item">
                  <label htmlFor="email">Email:</label>
                  <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
                </div>
                <div className="sp-hd-docDetails-item">
                  <label htmlFor="department">Department:</label>
                  <input type="text" name="department" placeholder="Department" value={department} onChange={handleChange} required />
                </div>
                <div className="sp-hd-docDetails-item">
                  <label htmlFor="specialty">Specialty:</label>
                  <input type="text" name="specialty" placeholder="Specialty" value={specialty} onChange={handleChange} required />
                </div>
                <div className="sp-hd-docDetails-item">
                  <label htmlFor="location">Location:</label>
                  <input type="text" name="location" placeholder="Location" value={location} onChange={handleChange} required />
                </div>
                <div className="sp-hd-docDetails-item">
                  <label htmlFor="availability">Availability:</label>
                  {daysOfWeek.map((day) => (
                    <div className='sp-hd-available' key={day}>
                      <label>{day}</label>
                      <div className='sp-hd-available-time'>
                        <input
                          type="time"
                          value={availability[day]?.start || ''}
                          onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                          required
                        />
                        <span> - </span>
                        <input
                          type="time"
                          value={availability[day]?.end || ''}
                          onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="sp-available-btn" type="submit" onClick={handleSubmit}>Submit Application</button>
              </form>
            </div>
        </section>
        </div>
    </>
  )
}

export default ApplyDoctor