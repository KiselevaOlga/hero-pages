import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#e4e4e4',
      main: '#2b2b2d',
      dark: '#1E1E1F',
      contrastText: '#fff',
    },
    secondary: {
      light: '#C6A972',
      main: '#E62429',
      dark: '#64191C',
      contrastText: '#fff',
    },
    success:{
        main: '#24d12d'
    },
    info:{
        main: '#2485D8'
    },
    warning:{
        main: '#F5A62C'
    }
  },
});
