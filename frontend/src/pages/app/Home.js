// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/home`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    if (user) {
      fetchUsername();
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white">
      <h1 className="mt-8 text-3xl font-bold text-black">Hola {username}!</h1>
    </div>
  );
};

export default Home;
