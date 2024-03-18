import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Homepage, Login, Profile, SignUp, Appointments, ApplyDoctor, Doctors, Patients } from './pages';
import { Toaster } from 'react-hot-toast';
import { SplashScreen } from './components';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const { loading } = useSelector(state => state.alerts);
  const isLoggedIn = localStorage.getItem('token');
  const isAdmin = JSON.parse(localStorage.getItem('admin')); // Parse to boolean

  return (
    <Router>
      {loading && <SplashScreen />}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Homepage /> : <Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Only visible to logged in users (not admin) */}
        <Route path="/profile" element={isLoggedIn && !isAdmin ? <Profile /> : <Login />} />
        <Route path="/appointments" element={isLoggedIn && !isAdmin ? <Appointments /> : <Login />} />

        {/* Only visible to logged in admin */}
        <Route
          path="/apply-doctor"
          element={isLoggedIn ? (isAdmin ? <ApplyDoctor /> : <Navigate to="/" />) : <Login />}
        />
        <Route path="/doctors" element={isLoggedIn ? (isAdmin ? <Doctors /> : <Navigate to="/" />) : <Login />} />
        <Route path="/users" element={isLoggedIn ? (isAdmin ? <Patients /> : <Navigate to="/" />) : <Login />} />
      </Routes>

    </Router>
  );
}

export default App;
