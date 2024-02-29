/* eslint-disable no-script-url */
import React from 'react';
import { Navbar, ScrollToTop } from '../../components';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';


function Profile() {

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
            <div className="sp-hd-profile">
              <FaUserCircle size={100} color='green' />
                <h3>John Doe</h3>
            </div>
          </div>

        </section>

        <ScrollToTop />
      </div>
    </>
  );
}

export default Profile;