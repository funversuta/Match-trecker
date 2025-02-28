import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router";

import { AuthProvider } from "./Context/AuthContext/AuthContext";
import { useAuth } from "./Context/AuthContext/authUtils";
import { ReactNode } from "react";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { ThemeProvider } from "./Context/ThemeContext/ThemeContext";
import { Profile } from "./pages/Profile/Profile";


type Props = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
