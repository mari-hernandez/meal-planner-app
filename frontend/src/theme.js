import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto'; // Importa la fuente que instalaste

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Define la familia de fuentes global
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
