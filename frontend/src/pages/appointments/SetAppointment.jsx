import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { useSelector } from 'react-redux';
import { Navbar, SelectDoctor, SelectPatient, Topbar } from '../../components';
import { toast } from 'react-hot-toast';
import './appointments.css';

const SetAppointment = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    patient: '',
    date: '',
    time: '',
    reason: ''
  });

  const isAdmin = useSelector(state => state.user.isAdmin);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };

  const handleSubmit = async e => {
      e.preventDefault();
      if (
        !formData.doctor ||
        !formData.patient ||
        !formData.date ||
        !formData.time ||
        !formData.reason
      ) {
        toast.error("Please fill in all the fields.");
        return;
      }
    try {
        await axios.post(`${BASE_URL}/appointments/set-up`, formData);
    console.log(formData)
        // Success notification
        toast.success("Appointment scheduled successfully.");
    } catch (error) {
        console.error('Error scheduling appointment:', error);
        // Error notification
        if (error.response && error.response.data && error.response.data.message) {
          // Display specific error message from the backend
          toast.error(error.response.data.message);
        } else {
          // Display generic error message
          toast.error("An error occurred. Please try again.");
        }
    }
  };

  return (
    <div className="sp-doc-main">
        <Navbar />
        <section className="sp-doc-sect">
          <Topbar title='Dashboard'/>
            <div className="sp-apply-doctor">
                <h2>Schedule an Appointment</h2>
                <div>
                {isAdmin && (
                    <form onSubmit={handleSubmit} className="sp-hd-aptDetails">
                        <div className="sp-hd-aptDetails-item">
                            <label htmlFor="doctor">Doctor:</label>
                            <select id='doctor' name='doctor' onChange={handleChange} value={formData.doctor} required>
                                <SelectDoctor />
                            </select>
                        </div>
                        <div className="sp-hd-aptDetails-item">
                            <label htmlFor="patient">Patient:</label>
                            <select id='patient' name='patient' onChange={handleChange} value={formData.patient} required>
                                <SelectPatient />
                            </select>
                        </div>
                        <div className="sp-hd-aptDetails-item">
                            <label htmlFor="date">Date:</label>
                            <input type="date" name="date" onChange={handleChange} value={formData.date} required />
                        </div>
                        <div className="sp-hd-aptDetails-item">
                            <label htmlFor="time">Time:</label>
                            <input type="time" name="time" onChange={handleChange} value={formData.time} required />
                        </div>
                        <div className="sp-hd-aptDetails-item">
                            <label htmlFor="reason">Reason:</label>
                            <textarea name="reason" onChange={handleChange} value={formData.reason} required />
                        </div>

                        <button type="submit">Schedule Appointment</button>
                    </form>
                )}
                </div>
            </div>
        </section>
    </div>
  );
};

export default SetAppointment;
