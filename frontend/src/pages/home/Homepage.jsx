import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './homepage.css';
import { Navbar, ScrollToTop, SplashScreen, Topbar } from '../../components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../utils/config';
import { setUser } from '../../redux/usersSlice';

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin); // Add isAdmin selector

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
        const response = await axios.post(`${BASE_URL}/users/profile`, {} , {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setUser(response.data.data));
        console.log(isAdmin); // Log isAdmin status here for debugging purposes

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
          <Topbar title='Dashboard'/>

          <div className="sp-header">
            <h3>Hello {user?.username}</h3>
            <p>Welcome to your Dashboard. Quickly view your recent activity</p>
          </div>

          {/* Conditional rendering based on isAdmin */}
          {isAdmin ? (
            // Admin content here
            <div className="admin-content">
              <h4>Admin Dashboard</h4>
              {/* Add admin-specific components */}
            </div>
          ) : (
            // Regular user content here
            <div className="user-content">
              <h4>User Dashboard</h4>
              {/* Add user-specific components */}
            </div>
          )}

        </section>

        <ScrollToTop />
      </div>
    </>
  );
}

export default Homepage;
