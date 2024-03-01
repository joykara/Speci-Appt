import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Homepage , Login, Profile, SignUp} from './pages';

import './App.css';

function App() {

  return (
      <Router>
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