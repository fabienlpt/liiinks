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
  facebook: string;
  linkedIn: string;
  behance: string;
  instagram: string;
  firstLink: {
    label: string;
    url: string;
  };
  secondLink: {
    label: string;
    url: string;
  };
  thirdLink: {
    label: string;
    url: string;
  };
  fourthLink: {
    label: string;
    url: string;
  };
  fifthLink: {
    label: string;
    url: string;
  };
}

export default function Page({ params }: { params: { username: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (params.username) {
      axios.get(`/api/user?username=${params.username}`).then((response) => {
        if (response.data.user) setUser(response.data.user);
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
            {user.avatar && <img src={user.avatar} alt="Avatar" />}
            {user.username && <p>Username: {user.username}</p>}
            {user.bio && <p>Bio: {user.bio}</p>}
            <div>
              <h1>Réseaux sociaux</h1>
              <ul>
                {user.twitter && <li className="border border-black rounded-lg border-solid border-opacity-100 border-width-1 mb-2">Twitter: {user.twitter}</li>}
                {user.facebook && <li>Facebook: {user.facebook}</li>}
                {user.linkedIn && <li>LinkedIn: {user.linkedIn}</li>}
                {user.behance && <li>Behance: {user.behance}</li>}
                {user.instagram && <li>Instagram: {user.instagram}</li>}
              </ul>
              <h1>Autres Liens</h1>
              <ul className="">
                {user.firstLink && <li className="bg-white border border-black rounded-xl border-solid border-opacity-100 border-width-1 mb-4"> <a href={user.firstLink.url}> {user.firstLink.label} </a></li>}
                {user.secondLink && <li> <a href={user.secondLink.url}> {user.secondLink.label} </a> </li>}
                {user.thirdLink && <li> <a href={user.thirdLink.url}>{user.thirdLink.label} </a></li>}
                {user.fourthLink && <li> <a href={user.fourthLink.url}>{user.fourthLink.label} </a> </li>}
                {user.fifthLink && <li> <a href={user.fourthLink.url}>{user.fifthLink.label} </a></li>}
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
