import React from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

const Topbar = ({title}) => {
  return (
    <div className="sp-topbar">
      <div className="sp-tp-title">
        <h2>{title}</h2>
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
  )
}

export default Topbar