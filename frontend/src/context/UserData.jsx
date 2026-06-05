import React, { createContext, useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export default function UserData({ children }) {
  
  let navigate = useNavigate();
  
  let [token, setToken] = useState(
    {
      access_token: null,
      refresh_token: null,
    }
);

  useEffect(() => {
    let token = {
      access_token: localStorage.getItem("access_token"),
      refresh_token: localStorage.getItem("refresh_token"),
    };
    if (token.access_token == null || token.refresh_token == null) {
      navigate("/auth");
    } else {
      setToken(token);
    }
  }, [navigate]);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}
