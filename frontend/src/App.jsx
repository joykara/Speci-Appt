import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage, Login, Profile, SignUp } from './pages';
import { Toaster } from 'react-hot-toast';

import './App.css';

function App() {
  // user authentication
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false}/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Homepage /> : <Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
      </Routes>
    </Router>
  )
}

export default App