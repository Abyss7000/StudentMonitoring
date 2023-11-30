import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Helper functions for managing cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const [user, setUser] = useState(() => {
    // Check the cookie for user data on initial load
    const storedUser = getCookie("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    // Check the cookie for the token on initial load
    const storedToken = getCookie("token");
    return storedToken || null;
  });

  useEffect(() => {
    // Decode the token and set user on component mount
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, [token]);

  const login = (token) => {
    // Decode the token to get user information
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);

    // Set user data and token in cookies
    setCookie("user", JSON.stringify(decodedToken), 1); // 1 day expiration (adjust as needed)
    setCookie("token", token, 1);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    // Remove user data and token from cookies
    deleteCookie("user");
    deleteCookie("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
