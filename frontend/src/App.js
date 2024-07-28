import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/app/Home';
import Landing from './pages/login/Landing';
import Register from './pages/login/Register';
import SignIn from './pages/login/SignIn';
import NotLoggedIn from './pages/login/NotLoggedIn';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/not-logged-in" element={<NotLoggedIn />} />
      </Routes>
    </div>
  );
}

export default App;
