import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Homepage, Login, Profile, SignUp, Appointments, ApplyDoctor } from './pages';
import { Toaster } from 'react-hot-toast';
import { SplashScreen } from './components';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const { loading } = useSelector(state => state.alerts);
  const isLoggedIn = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('admin') === 'true';

  return (
    <Router>
      {loading && <SplashScreen />}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Homepage /> : <Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
        <Route path="/appointments" element={isLoggedIn ? <Appointments /> : <Login />} />
        <Route
          path="/apply-doctor"
          element={isLoggedIn ? (isAdmin ? <ApplyDoctor /> : <Navigate to="/" />) : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
