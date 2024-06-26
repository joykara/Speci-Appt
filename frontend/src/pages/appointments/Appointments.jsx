import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { Navbar, Topbar } from '../../components';
import { toast } from 'react-hot-toast';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/appointments/user-appointment`, {
          params: {
            page: page // Pass current page as query parameter
          },
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
  }, [page]); // Fetch appointments when currentPage changes

  const handleNextPage = () => {
    setPage((prevPage) => prevPage +1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="sp-doc-main">
      <Navbar />
      <section className="sp-doc-sect">
        <Topbar title="My Appointments" />

        <div className="sp-dash-appt">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Doctor</th>
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
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='sp-tablePage'>
              <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
              <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Appointments;
