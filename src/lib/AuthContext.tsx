"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null as null | object,
  login: (email: string) => {},
  register: (formData: object) => {},
  emailSent: false,
  error: "",
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<object | null>(null);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    let url = "/api/verify";

    if (token) {
      url = url + `?token=${token}`;
    }

    axios
      .get(url)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error verifying token:", error);
      });
  }, []);

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
  async function register(formData: object) {
    axios
      .post("/api/user", formData)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
        }
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }

  return (
    <AuthContext.Provider value={{ user, login, register, emailSent, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };