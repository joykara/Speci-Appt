/* eslint-disable no-script-url */
import React from 'react';
import { Navbar, ScrollToTop } from '../components';


function Homepage() {

  return (
    <div>
      <Navbar />
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ScrollToTop />
    </div>
  );
}

export default Homepage;