/* eslint-disable no-script-url */
import React from 'react';
import './homepage.css';
import { Navbar, ScrollToTop } from '../../components';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';


function Homepage() {

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
            <h3>Hello Joy</h3>
            <p>Welcome to your Dashboard. Quickly view your recent activity</p>
          </div>

          <div className="sp-overview">
            <h4>Upcoming Appointment</h4>
            <div className="sp-ovw-cards">
              <div className="sp-ovw-card">
                <h3>Income</h3>
                <p>$5,000</p>
              </div>
              <div className="sp-ovw-card">
                <h3>Expenses</h3>
                <p>$2,000</p>
              </div>
              <div className="sp-ovw-card">
                <h3>Balance</h3>
                <p>$3,000</p>
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