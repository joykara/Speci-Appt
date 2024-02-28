/* eslint-disable no-script-url */
import React from 'react';
import { Navbar, ScrollToTop } from '../components';


function Homepage() {

  return (
    <div className="sp-main">
      <Navbar />
      <div className="sp-topbar">
        <h1>Dashboard</h1>
        {/* current date set as day date month and year */}
        <h2>{new Date().toLocaleDateString()}</h2>
        <div>
          
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}

export default Homepage;