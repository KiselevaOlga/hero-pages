import React, { useState } from "react";
import {
  Box,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { theme } from "./theme";
import { Hero } from "./routes/hero";
import { Heroes } from "./routes/heroes";
import { Login } from "./routes/login";
import { useAuth, useFindUser, UserContext } from "./components/UserContext";

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
          <Route element={<Navigation />}>
            <Route
              path="/"
              element={<LoginRequiredRoute userIsActive={!!user} />}
            >
              <Route path="heroes" element={<Heroes />} />
              <Route path="heroes/:id" element={<Hero />} />
            </Route>

            <Route path="login" element={<Login onLogin={loginUser} error={error} />} />
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
) => {
  if (!userIsActive) {
   return <Navigate to={redirectPath} />;
  }
  return <Outlet />;
};


export const Navigation = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Box component={"main"} sx={{ 
        minHeight: 'calc(100vh - (100px))',
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
