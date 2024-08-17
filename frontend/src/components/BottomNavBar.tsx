import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export enum NavBarRoutes {
  HOME = "/home",
  SEARCH = "/search",
  NEW_RECIPE = "/newRecipe",
  PROFILE = "/profile",
}

interface BottomNavBarButtonProps {
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
}

const BottomNavBarButton: React.FC<BottomNavBarButtonProps> = ({
  icon,
  isActive,
  onClick,
}) => {
  return (
    <BottomNavigationAction
      icon={icon}
      onClick={onClick}
      {...(isActive && { sx: { color: "primary.main" } })}
    />
  );
};

interface BottomNavBarProps {
  activeRoute?: NavBarRoutes;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeRoute }) => {
  const navigate = useNavigate();
  const [currentActiveRoute, setCurrentActiveRoute] = useState(
    activeRoute ?? NavBarRoutes.HOME
  );

  const handleNavigation = (route: NavBarRoutes) => {
    navigate(route);
    setCurrentActiveRoute(route);
  };

  return (
    <BottomNavigation
      value={currentActiveRoute}
      onChange={(event, newRoute) => {
        setCurrentActiveRoute(newRoute);
      }}
      showLabels
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <BottomNavBarButton
        icon={<CalendarTodayIcon />}
        isActive={currentActiveRoute === NavBarRoutes.HOME}
        onClick={() => handleNavigation(NavBarRoutes.HOME)}
      />
      <BottomNavBarButton
        icon={<SearchIcon />}
        isActive={currentActiveRoute === NavBarRoutes.SEARCH}
        onClick={() => handleNavigation(NavBarRoutes.SEARCH)}
      />
      <BottomNavBarButton
        icon={<AddCircleIcon />}
        isActive={currentActiveRoute === NavBarRoutes.NEW_RECIPE}
        onClick={() => handleNavigation(NavBarRoutes.NEW_RECIPE)}
      />
      <BottomNavBarButton
        icon={<AccountCircleIcon />}
        isActive={currentActiveRoute === NavBarRoutes.PROFILE}
        onClick={() => handleNavigation(NavBarRoutes.PROFILE)}
      />
    </BottomNavigation>
  );
};
