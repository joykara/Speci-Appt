import React from 'react';
import './splashscreen.css';
import RingLoader from "react-spinners/RingLoader";


const SplashScreen = () => {

  return (
    <div className="splash-screen">
      <div className="loader">
        <RingLoader color={"#36d7b7"} loading={true} size={100} />
      </div>
    </div>
  );
}

export default SplashScreen;
