"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { User } from "./user.model";

const AuthContext = createContext({
  user: null as null | User,
  login: (email: string) => {},
  register: (formData: object) => {},
  emailSent: false,
  error: "",
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
        response.data.user = parseUserData(response.data.user);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error verifying token:", error);
      });
  }, []);

  function parseUserData(data: any) {
    let user: User = data as User;
    user.behance = JSON.parse(data.behance);
    user.linkedIn = JSON.parse(data.linkedIn);
    user.firstLink = JSON.parse(data.firstLink);
    user.secondLink = JSON.parse(data.secondLink);
    user.thirdLink = JSON.parse(data.thirdLink);
    user.fourthLink = JSON.parse(data.fourthLink);
    user.fifthLink = JSON.parse(data.fifthLink);
    user.facebook = JSON.parse(data.facebook);
    user.instagram = JSON.parse(data.instagram);
    user.twitter = JSON.parse(data.twitter);

    return user;
  }

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
          response.data.user = parseUserData(response.data.user);
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
