import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#e4e4e4",
      main: "#2b2b2d",
      dark: "#1E1E1F",
      contrastText: "#fff",
    },
    secondary: {
      light: "#C6A972",
      main: "#E62429",
      dark: "#64191C",
      contrastText: "#fff",
    },
    success: {
      main: "#0faf17",
    },
    info: {
      main: "#2485D8",
    },
    warning: {
      main: "#fa9e13",
    },
    error: {
        main: "#eb4f54",
    }
  },
});

theme.typography.h6 = {
    fontSize: "1rem",
    "@media (min-width:600px)": {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.25rem",
    },
  };
theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

theme.typography.h2 = {
  fontSize: "2.5rem",
  "@media (min-width:600px)": {
    fontSize: "3.3rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3.75rem",
  },
};
