import React, {useState} from 'react';
import './navbar.css';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import logo from "../../assets/speciappt.png";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const handleToggle = () => {
        setToggleMenu(!toggleMenu)
    }

    return (
        <div className="navbar-container">
            <div className="navbar-logo">
                {/* add logo as link to  home page */}
                <Link to="/home">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
            </div>

            <ul className="navbar-links">
                <li><a href="/appointments">APPOINTMENTS</a></li>
                <li><a href="/profile">PROFILE</a></li>
                <li><a href="/doctors">DOCTORS</a></li>
                <li><a href="/contact">CONTACT</a></li>
            </ul>

            {/* hamburger navbar */}
            <div className={`navbar-toggle ${toggleMenu ? 'active' : ''}`} onClick={handleToggle}>
                {toggleMenu ? <RiCloseLine size={25} color='black'/> : <RiMenuLine size={25} color='black'/>}
                {toggleMenu && (
                <nav className="navbar-menu-mobile">
                    <ul>
                        <li><a href="/appointments">APPOINTMENTS</a></li>
                        <li><a href="/profile">PROFILE</a></li>
                        <li><a href="/doctors">DOCTORS</a></li>
                        <li><a href="/contact">CONTACT</a></li>
                    </ul>
                </nav>
                )}
            </div>
      </div>
  )
}

export default Navbar