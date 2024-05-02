"use client";
import Header from "@/components/header";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
}

export default function Page({ params }: { params: { username: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (params.username) {
      axios.get(`/api/user?username=${params.username}`).then((response) => {
        if (response.data.length > 0) setUser(response.data);
        else setUser(null);
      });
      setLoading(false);
    }
  }, [params.username]);

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Header isConnected={false} />
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Bonjour {params.username} !
            </h2>
          </div>
        </div>
      ) : (
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Utilisateur non trouvé
        </h2>
      )}
    </div>
  );
}
