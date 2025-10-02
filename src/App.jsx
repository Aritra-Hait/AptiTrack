import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Home from './pages/home.jsx'
import Dashboard from './pages/dashboard.jsx'
function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/performanceDashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>

  )
}

export default App
