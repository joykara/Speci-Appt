import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../assets/speciappt.png";
import './navbar.css';
import { logoutUser } from '../../redux/usersSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggleMenu, setToggleMenu] = useState(false);
    const location = useLocation();
    const isAdmin = useSelector(state => state.user.isAdmin);

    const handleToggle = () => {
        setToggleMenu(!toggleMenu);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        // clear local storage and go to login page
        localStorage.clear();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="navbar-container">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
            </div>

            <ul className="navbar-links">
                {!isAdmin && (<li className={`${isActive("/appointments") ? 'active-menu' : ''}`}>
                    <Link to="/appointments">APPOINTMENTS</Link>
                </li>)}
                {isAdmin && (
                    <li className={`${isActive("/set-appointment") ? 'active-menu' : ''}`}>
                        <Link to="/set-appointment">SET APPOINTMENT</Link>
                    </li>
                )}
                {isAdmin && (
                    <li className={`${isActive("/admin-appts") ? 'active-menu' : ''}`}>
                        <Link to="/admin-appts">ALL APPOINTMENTS</Link>
                    </li>
                )}
                {!isAdmin && (
                    <li className={`${isActive("/profile") ? 'active-menu' : ''}`}>
                        <Link to="/profile">PROFILE</Link>
                    </li>
                )}
                {isAdmin && (
                    <li className={`${isActive("/doctors") ? 'active-menu' : ''}`}>
                        <Link to="/doctors">DOCTORS</Link>
                    </li>
                )}
                {isAdmin && (
                    <li className={`${isActive("/users") ? 'active-menu' : ''}`}>
                        <Link to="/users">USERS</Link>
                    </li>
                )}
                {isAdmin && (
                    <li className={isActive('/apply-doctor') ? 'active-menu' : ''}>
                        <Link to="/apply-doctor">APPLY DOCTOR</Link>
                    </li>
                )}
                <li><a onClick={handleLogout}>LOGOUT</a></li>
            </ul>

            {/* <div className={`navbar-toggle ${toggleMenu ? 'active' : ''}`} onClick={handleToggle}>
                {toggleMenu ? <RiCloseLine size={25} color='black'/> : <RiMenuLine size={25} color='black'/>}
                {toggleMenu && (
                    <nav className="navbar-menu-mobile">
                        <ul>
                            <li><Link to="/appointments">APPOINTMENTS</Link></li>
                            <li><Link to="/profile">PROFILE</Link></li>
                            {!isAdmin && <li><Link to="/doctors">DOCTORS</Link></li>}
                            <li><a onClick={handleLogout}>LOGOUT</a></li>
                        </ul>
                    </nav>
                )}
            </div> */}
        </div>
    );
}

export default Navbar;
