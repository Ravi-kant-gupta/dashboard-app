
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import MenuForm from './components/MenuForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<MenuForm />} />
          <Route path="/edit/:id" element={<MenuForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

