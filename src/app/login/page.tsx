"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Header from "@/components/header";
import { AuthContext } from "@/lib/AuthContext";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const { login, error, emailSent } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(email);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      axios
        .get(`/api/login?token=${token}`)
        .then((response) => {
          console.log("Token verified:", response.data);
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
        });
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Header isConnected={false} />
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion
          </h2>
          <span className="text-red-500">{error}</span>
          {emailSent && (
            <span className="text-green-500">Un email vous a été envoyé</span>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Adresse email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Recevoir mon magic link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
