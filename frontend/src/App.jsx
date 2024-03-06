import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage, Login, Profile, SignUp } from './pages';
import { Toaster } from 'react-hot-toast';

import './App.css';

function App() {

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false}/>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App