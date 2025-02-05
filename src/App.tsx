import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UpdateEnterprise from './pages/UpdateEnterprise';
import CreateEnterprise from './pages/CreateEnterprise';
import DeleteEnterprise from './pages/DeleteEnterprise';
import CreateEmployee from './pages/CreateEmployee';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<UpdateEnterprise />} />
        <Route path="/create" element={<CreateEnterprise />} />
        <Route path="/delete/:id" element={<DeleteEnterprise />} />
        <Route path="/enterprise/:id/new-employee" element={<CreateEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
