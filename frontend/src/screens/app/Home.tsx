import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useAuth } from "../../contexts";
import { BottomNavBar } from "../../components";
import { CenteredColumnContainer } from "../../styles";
import axios from "axios";

export const Home: React.FC = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (!user) {
          throw new Error("User is not logged in");
        }
        const response = await axios.get(`${backendUrl}/auth/home`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    if (user) {
      fetchUsername();
    }
  }, [user]);
  return (
    <>
      <CenteredColumnContainer>
        <Typography variant="h3">Hola {username}! </Typography>
      </CenteredColumnContainer>
      <BottomNavBar />
    </>
  );
};
