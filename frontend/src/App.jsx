import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage, Login, Profile, SignUp, Appointments } from './pages';
import { Toaster } from 'react-hot-toast';
import { SplashScreen } from './components';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const {loading} = useSelector(state => state.alerts);
  // user authentication
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Router>
      {loading && <SplashScreen />}
      <Toaster position="top-right" reverseOrder={false}/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Homepage /> : <Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
        <Route path='/appointments' element={<Appointments />} />
      </Routes>
    </Router>
  )
}

export default App