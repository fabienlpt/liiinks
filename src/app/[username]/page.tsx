"use client";
import Header from "@/components/header";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
  bio: string;
  mainColor: string;
  backgroundGradient: string;
  fontChoice: string;
  avatar: string;
  twitter: string;
  facebook : string;
  linkedIn: string;
  behance: string;
  instagram: string;
  firstLink: string;
  secondLink: string;
  thirdLink: string;
  fourthLink: string;
  fifthLink: string;

}

export default function Page({ params }: { params: { username: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (params.username) {
      axios.get(`/api/user?username=${params.username}`).then((response) => {
        if (response.data.length > 0) setUser(response.data);
        else setUser(null);

        console.log(response.data);
        setLoading(false);
    });
    }
  }, [params.username]);

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Header />
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <div className="max-w-md w-full space-y-8">
           <div>
      <h1>Profil</h1>
      {user.avatar && (
        <img src={user.avatar} alt="Avatar" />
      )}
      {user.username && (
        <p>Username: {user.username}</p>
      )}
      {user.bio && (
        <p>Bio: {user.bio}</p>
      )}
      <div>
        <h1>Réseaux sociaux</h1>
        <ul>
          {user.twitter && (
            <li>Twitter: {user.twitter}</li>
          )}
          {user.facebook && (
            <li>Facebook: {user.facebook}</li>
          )}
          {user.linkedIn && (
            <li>LinkedIn: {user.linkedIn}</li>
          )}
          {user.behance && (
            <li>Behance: {user.behance}</li>
          )}
          {user.instagram && (
            <li>Instagram: {user.instagram}</li>
          )}
        </ul>
        <h1>Autres Liens</h1>
        <ul>
          {user.firstLink && (
            <li>First Link: {user.firstLink}</li>
          )}
          {user.secondLink && (
            <li>Second Link: {user.secondLink}</li>
          )}
          {user.thirdLink && (
            <li>Third Link: {user.thirdLink}</li>
          )}
          {user.fourthLink && (
            <li>Fourth Link: {user.fourthLink}</li>
          )}
          {user.fifthLink && (
            <li>Fifth Link: {user.fifthLink}</li>
          )}
        </ul>
      </div>
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
