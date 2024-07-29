// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
// import Results from './components/Results';
const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/results" element={<Results />} /> */}
      </Routes>
    </Router>
  );
}

export default App


