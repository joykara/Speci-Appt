import React, { useState } from 'react';
import { Navbar, ScrollToTop } from '../../components';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './profile.css';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Redirect to login page if token is not available
          navigate('/login');
          return;
        }

        // Fetch user data using the JWT token
        const response = await axios.post(`${BASE_URL}/users/profile`, {} , {
          headers: { Authorization: `Bearer ${token}` },
        });

        // console.log(user)
        dispatch(setUser(response.data.data))

      } catch (error) {
        // Handle errors
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data');
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <div className="sp-main">
        <Navbar />

        <section className="sp-hero-sect">
          <div className="sp-topbar">
            <div className="sp-tp-title">
              <h2>Dashboard</h2>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            <ul className="sp-tp-details">
              <li> <IoMdNotificationsOutline size={35} /> </li>
              <li> <FaUserCircle size={35} color="green" /> </li>
            </ul>
          </div>

          <div className="sp-header">
            <div className="sp-hd-profile">
              <FaUserCircle size={100} color="green" />
              <h3>{user.name}</h3>
            </div>
            <div className="sp-hd-profileDetails">
              <div className="sp-hd-profileDetails-item">
                <label>Email:</label>
                {editMode ? (
                  <input
                    type="email" name="email" value={user.email} onChange={handleChange}
                    placeholder='Email Address' required
                  />
                ) : (
                  <p>{user.email}</p>
                )}
              </div>
              <div className="sp-hd-profileDetails-item">
                <label>Phone:</label>
                {editMode ? (
                  <input
                    type="tel" name="phone" value={user.phone} onChange={handleChange}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  />
                ) : (
                  <p>{user.phone}</p>
                )}
              </div>
              <div className="sp-hd-profileDetails-item">
                <label>Address:</label>
                {editMode ? (
                  <textarea name="address" value={user.address} onChange={handleChange}
                  />
                ) : (
                  <p>{user.address}</p>
                )}
              </div>
              <div className="sp-hd-profileDetails-item">
                <label>Date of Birth:</label>
                {editMode ? (
                  <input
                    type="date" name="dob" value={user.dob} onChange={handleChange}
                  />
                ) : (
                  <p>{user.dob}</p>
                )}
              </div>
              <div className="sp-hd-profileDetails-item">
                <label>Password:</label>
                {editMode ? (
                  <input
                    type="password" name="password" value={user.password} onChange={handleChange}
                    placeholder='Password' required
                  />
                ) : (
                  <p>********</p>
                )}
              </div>
            </div>

            {/*  Buttons */}
            <div className="sp-hd-profileBtn">
              <button className="light-button" onClick={handleEdit}>
                {editMode ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>
        </section>

        <ScrollToTop />
      </div>
    </>
  );
}

export default Profile;