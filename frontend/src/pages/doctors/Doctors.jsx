import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { Navbar, Topbar } from '../../components';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/doctors?page=${page}&limit=20`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDoctors(response.data.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      <div className="sp-doc-main">
        <Navbar />
        <section className="sp-doc-sect">
          <Topbar title='Doctors List' />
          <div  className="sp-dash-content">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Contact</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Specialization</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{doctor.firstName} {doctor.lastName}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.contact}</td>
                    <td>{doctor.department}</td>
                    <td>{doctor.location}</td>
                    <td>{doctor.specialty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div  className='sp-tablePage'>
              <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
              <button onClick={handleNextPage}>Next</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Doctors;
