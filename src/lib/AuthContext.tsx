"use client";
import axios from "axios";
import React, { createContext, useState } from "react";

const AuthContext = createContext({
  user: null as null | object,
  login: (email: string) => {},
  register: (email: string, username: string) => {},
  emailSent: false,
  error: "",
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<object | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function login(email: string) {
    const body = { email };
    axios
      .post("/api/login", body)
      .then(function (response) {
        if (response.status === 200) {
          setEmailSent(true);
          setError("");
        }
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }
  function register(email: string, username: string) {}
  function verify(token: string) {}

  return (
    <AuthContext.Provider value={{ user, login, register, emailSent, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
