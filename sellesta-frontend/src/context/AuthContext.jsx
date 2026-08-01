import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get("profile/");
      setUser(res.data);
    }catch(err){
      setUser(null);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchProfile().finally(() => setLoading(false));
    }else{
    setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const res = await api.post("token/", { username, password });
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh)
    await fetchProfile();
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user , login , logout , loading}}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
    return useContext(AuthContext);
}