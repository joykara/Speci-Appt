import React, {useState} from 'react';
import './navbar.css';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const handleToggle = () => {
        setToggleMenu(!toggleMenu)
    }

    return (
      <div className="navbar-container">
            <div className="navbar-logo">
                <Link to={'/'}><h2 className='logo'>SPECIAPPT</h2></Link>
            </div>
            <div>
                <ul className="navbar-links">
                    <li><a href="/#about-me">APPOINTMENTS</a></li>
                    <li><a href="/projects">PROFILE</a></li>
                    <li><a href="/#contact">CONTACT</a></li>
                </ul>
            </div>
            {/* hamburger navbar */}
            <div className={`navbar-toggle ${toggleMenu ? 'active' : ''}`} onClick={handleToggle}>
                {toggleMenu ? <RiCloseLine size={25} color='black'/> : <RiMenuLine size={25} color='black'/>}
                {toggleMenu && (
                <nav className="navbar-menu-mobile">
                    <ul>
                        <li><a href="/#about-me">APPOINTMENTS</a></li>
                        <li><a href="/projects">PROFILE</a></li>
                        <li><a href="/#contact">CONTACT</a></li>
                    </ul>
                </nav>
                )}
            </div>
      </div>
  )
}

export default Navbar