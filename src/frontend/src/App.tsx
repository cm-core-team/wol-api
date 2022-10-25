import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from './components/Home/Home';

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
