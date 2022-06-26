import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  ThemeProvider,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { theme } from "./theme";
import { Hero } from "./routes/hero";
import { Heroes } from "./routes/heroes";
import { Login } from "./routes/login";
import { useAuth, useFindUser, UserContext } from "./UserContext";

export const useCheckUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  return {
    user,
    setUser,
    isLoading,
  };
};
export interface User {
  name: string;
  password: string;
}
function App() {
  const { loginUser, error } = useAuth();
  const { user, setUser, isLoading } = useFindUser();

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      <Box>
        <Routes>
          <Route element={<Navigation isActive={!!user} />}>
            <Route
              path="/"
              element={<LoginRequiredRoute userIsActive={!!user} />}
            >
              <Route path="heroes" element={<Heroes />} />
              <Route path="heroes/:id" element={<Hero />} />
            </Route>

            <Route path="login" element={<Login onLogin={loginUser} />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </Box>
    </UserContext.Provider>
  );
}

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

type LoginRequiredRouteProps = {
  userIsActive: boolean;
  redirectPath?: string;
};

const LoginRequiredRoute: React.FC<LoginRequiredRouteProps> = (
  { userIsActive, redirectPath = "/login" },
  children
) => {
  if (!userIsActive) {
    return <Navigate to={redirectPath} />;
  }
  return <Outlet />;
};

interface NavigationProps {
  isActive: boolean;
}

export const Navigation = ({ isActive }: NavigationProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar component={"nav"}>
        <Toolbar sx={{ background: (theme) => theme.palette.primary.main }}>
          {!isActive ? (
            <Link to="/login">
              <Typography variant="body1">Log In</Typography>
            </Link>
          ) : (
            <Typography variant="body1">Welcome</Typography>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Box component={"main"} sx={{ 
        minHeight: 'calc(100vh - (64px + 100px))',
        display: 'flex',
        flexDirection: 'column',
        '& > *':{
          flex: 1
        }
         }}>
        <Outlet />
      </Box>
      <Box
        component={"footer"}
        sx={{
          height: 100,
          width: "100%",
          background: theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
        }}
      >
        <Typography variant="body1" align="center" sx={{padding: 3}}>
          Coded by Olga Kiseleva
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;
