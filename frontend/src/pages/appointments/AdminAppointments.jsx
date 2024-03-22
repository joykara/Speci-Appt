// AdminAppointments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { Navbar, Topbar } from '../../components';
import { toast } from 'react-hot-toast';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/appointments/admin-appts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT token for authentication
          }
        });
        if (response.data && response.data.appointments) {
          setAppointments(response.data.appointments);
        }
      } catch (error) {
        toast.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="sp-doc-main">
      <Navbar />
      <section className="sp-doc-sect">
        <Topbar title="All Appointments" />

        <div className="sp-dash-appt">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment._id}>
                  <td>{appointment.doctor.firstName} {appointment.doctor.lastName}</td>
                  <td>{appointment.patient.username}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminAppointments;
