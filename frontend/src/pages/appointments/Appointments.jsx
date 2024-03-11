import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../../components';

const Appointments = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/api/appointments?patientId=${patientId}`);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [patientId]);

    return (
      <div className="sp-main">
        <Navbar />
        <div>
        <h1>Your Appointments</h1>
        <div>
            <h2>Upcoming Appointments</h2>
            <ul>
            {appointments
                .filter((appt) => appt.status === 'Upcoming')
                .map((appt) => (
                <li key={appt.id}>
                    <div>
                    <strong>Doctor Name:</strong> {appt.doctorName}
                    </div>
                    <div>
                    <strong>Date:</strong> {appt.date}
                    </div>
                    <div>
                    <strong>Time:</strong> {appt.time}
                    </div>
                </li>
                ))}
            </ul>
        </div>
        <div>
            <h2>Past Appointments</h2>
            <ul>
            {appointments
                .filter((appt) => appt.status === 'Past')
                .map((appt) => (
                <li key={appt.id}>
                    <div>
                    <strong>Doctor Name:</strong> {appt.doctorName}
                    </div>
                    <div>
                    <strong>Date:</strong> {appt.date}
                    </div>
                    <div>
                    <strong>Time:</strong> {appt.time}
                    </div>
                </li>
                ))}
            </ul>
        </div>
        </div>
      </div>
  );
};

export default Appointments;
