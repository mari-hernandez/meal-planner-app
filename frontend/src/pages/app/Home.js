import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import BottomNavBar from '../../components/BottomNavBar';
import CustomHeading from '../../components/CustomText';
import CustomPrincipalDiv from '../../components/CustomDiv';

const Home = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/auth/home`, {
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
    <div>
    <CustomPrincipalDiv>
      <CustomHeading>Hola {username}! </CustomHeading>
    </CustomPrincipalDiv>
    <BottomNavBar />
    </div>
  );
};

export default Home;