import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/login/Landing';
import Register from './pages/login/Register';
import SignIn from './pages/login/SignIn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
