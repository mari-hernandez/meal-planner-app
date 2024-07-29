import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleNavigation = (path: string, index: number) => {
    navigate(path);
    setValue(index);
  };
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <BottomNavigationAction
        icon={<CalendarTodayIcon />}
        onClick={() => handleNavigation("/home", 0)}
        style={{ color: value === 0 ? "blue" : "gray" }} // Cambia 'blue' y 'gray' a los colores deseados
      />
      <BottomNavigationAction
        icon={<SearchIcon />}
        onClick={() => handleNavigation("/search", 1)}
        style={{ color: value === 1 ? "blue" : "gray" }} // Cambia 'blue' y 'gray' a los colores deseados
      />
      <BottomNavigationAction
        icon={<AddCircleIcon />}
        onClick={() => handleNavigation("/newRecipe", 2)}
        style={{ color: value === 2 ? "blue" : "gray" }} // Cambia 'blue' y 'gray' a los colores deseados
      />
      <BottomNavigationAction
        icon={<AccountCircleIcon />}
        onClick={() => handleNavigation("/profile", 3)}
        style={{ color: value === 3 ? "blue" : "gray" }} // Cambia 'blue' y 'gray' a los colores deseados
      />
    </BottomNavigation>
  );
};
