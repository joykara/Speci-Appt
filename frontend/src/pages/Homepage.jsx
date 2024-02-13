/* eslint-disable no-script-url */
import React, {useEffect} from 'react';
import { Navbar, ScrollToTop } from '../components';


function Homepage() {

  return (
    <div>
      <Navbar />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Header />
      <ScrollToTop />
    </div>
  );
}

export default Homepage;