import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("mediqueue_token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((response) => setUser(response.data.user))
      .catch(() => {
        localStorage.removeItem("mediqueue_token");
        localStorage.removeItem("mediqueue_user");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("mediqueue_token", response.data.token);
    localStorage.setItem("mediqueue_user", JSON.stringify(response.data.user));
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
    localStorage.removeItem("mediqueue_token");
    localStorage.removeItem("mediqueue_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
