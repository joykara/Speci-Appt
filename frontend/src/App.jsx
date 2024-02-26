import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Homepage , Login} from './pages';

import './App.css';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </Router>
  )
}

export default App