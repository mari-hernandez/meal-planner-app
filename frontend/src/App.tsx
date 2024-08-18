import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Landing, SignIn, SignUp } from "./screens/auth";
import { Home, NewRecipe, Profile } from "./screens/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { theme } from "./config/theme";

const muiTheme = createTheme({
  palette: { primary: { main: theme.palette.text.primary } },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  typography: { fontFamily: "Poppins" },
});

function PublicOnlyRoute() {
  return <Outlet />;
}

function PrivateRoute() {
  return <Outlet />;
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="" element={<PublicOnlyRoute />}>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        {/* Private Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/newRecipe" element={<NewRecipe />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <div>
      <ThemeProvider theme={muiTheme}>
        <AppRouter />
      </ThemeProvider>
    </div>
  );
};

export default App;
