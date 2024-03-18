import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { Navbar } from '../../components';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Patients = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/all?page=${page}&limit=15`);
        setUsers(response.data.data);
      } catch (error) {
        toast.error('Error fetching patients:', error);
      }
    };

    fetchUsers();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage +1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

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
              <li>
                <IoMdNotificationsOutline size={35} />
              </li>
              <li>
                <FaUserCircle size={35} color="green" />
              </li>
            </ul>
          </div>
          <div className="sp-dash-content">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>DOB</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                    <td>{user.address}</td>
                    <td>{new Date(user.dob).toLocaleDateString()}</td>
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
    </>
  );
};

export default Patients;