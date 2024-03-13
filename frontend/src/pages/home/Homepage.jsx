/* eslint-disable no-script-url */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './homepage.css';
import { Navbar, ScrollToTop, SplashScreen } from '../../components';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../utils/config';
import { setUser } from '../../redux/usersSlice';

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Redirect to login page if token is not available
          navigate('/login');
          return;
        }

        // Fetch user data using the JWT token
        const response = await axios.post(`${BASE_URL}/user/profile`, {} , {
          headers: { Authorization: `Bearer ${token}` },
        });

        // console.log(user)
        dispatch(setUser(response.data.data))

      } catch (error) {
        // Handle errors
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data');
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  if (!user) {
    return <SplashScreen />;
  }
  return (
    <>
      <div className="sp-main">
        <Navbar />

        <section className='sp-hero-sect'>
          <div className="sp-topbar">
            <div className="sp-tp-title">
              <h2>Dashboard</h2>
              {/* current date set as day date month and year */}
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            <ul className="sp-tp-details">
              <li><IoMdNotificationsOutline size={35} /></li>
              <li><FaUserCircle size={35} color='green' /></li>
            </ul>
          </div>

          <div className="sp-header">
            <h3>Hello {user?.username}</h3>
            <p>Welcome to your Dashboard. Quickly view your recent activity</p>
          </div>

          <div className="sp-overview">
            <h4>Upcoming Appointment</h4>
            <div className="sp-ovw-cards">
              <div className="sp-ovw-card">
                <h5>Dr. John Doe</h5>
                <p>Cardiologist</p>
                <p>12:00 PM</p>
              </div>
            </div>
          </div>

        </section>

        <ScrollToTop />
      </div>
    </>
  );
}

export default Homepage;