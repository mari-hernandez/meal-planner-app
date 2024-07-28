import * as React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white' }}
    >
      <BottomNavigationAction
        //label="Calendario"
        icon={<CalendarTodayIcon />}
        onClick={() => handleNavigation('/calendar')}
      />
      <BottomNavigationAction
        //label="Buscar"
        icon={<SearchIcon />}
        onClick={() => handleNavigation('/search')}
      />
      <BottomNavigationAction
        //label="Agregar"
        icon={<AddCircleIcon />}
        onClick={() => handleNavigation('/add')}
      />
      <BottomNavigationAction
        //label="Perfil"
        icon={<AccountCircleIcon />}
        onClick={() => handleNavigation('/profile')}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
