"use client";
import Header from "@/components/header";
import axios from "axios";
import Link from "next/link";
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
  socialMedias: Array<{ label: string; url: string }>;
  links: Array<{ label: string; url: string }>;
}

export default function Page({ params }: { params: { username: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [background, setBackground] = useState<string>("#F8F7F0");
  const [color, setColor] = useState<string>("#000000");

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

  useEffect(() => {
    if (user) {
      setBackground(user.backgroundGradient);
      setColor(user.mainColor);
      document.body.style.fontFamily = user.fontChoice;
    }
  }, [user]);

  return (
    <div className="min-h-screen pl-8 pt-4" style={{ background, color }}>
      <Link href="/" className="hover:text-gray-400">
        Liiinks
      </Link>
      <div className="flex flex-col items-center p-24">
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <div className="max-w-md w-full space-y-8">
            <div className="flex flex-col items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-[#F8F7F0] border border-black rounded-full">
                  <span className="text-3xl text-gray-600">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              {user.username && <p>{user.username}</p>}
              {user.bio && <p>{user.bio}</p>}
              <div>
                <h1>Réseaux sociaux</h1>
                <ul>
                  {user.links.map((link) => (
                    <li
                      key={link.label}
                      className="border border-black rounded-lg border-solid border-opacity-100 border-width-1 mb-2"
                    >
                      <a href={link.url}>{link.label}</a>
                    </li>
                  ))}
                  {user.socialMedias.map((link) => (
                    <li
                      key={link.label}
                      className="border border-black rounded-lg border-solid border-opacity-100 border-width-1 mb-2"
                    >
                      <a href={link.url}>{link.label}</a>
                    </li>
                  ))}
                  {/* {user.twitter && (
                    <li className="border border-black rounded-lg border-solid border-opacity-100 border-width-1 mb-2">
                      Twitter: {user.twitter}
                    </li>
                  )}
                  {user.facebook && <li>Facebook: {user.facebook}</li>}
                  {user.linkedIn && <li>LinkedIn: {user.linkedIn}</li>}
                  {user.behance && <li>Behance: {user.behance}</li>}
                  {user.instagram && <li>Instagram: {user.instagram}</li>}
                </ul>
                <h1>Autres Liens</h1>
                <ul className="">
                  {user.firstLink && (
                    <li className="bg-white border border-black rounded-xl border-solid border-opacity-100 border-width-1 mb-4">
                      {" "}
                      <a href={user.firstLink.url}> {user.firstLink.label} </a>
                    </li>
                  )}
                  {user.secondLink && (
                    <li>
                      {" "}
                      <a href={user.secondLink.url}>
                        {" "}
                        {user.secondLink.label}{" "}
                      </a>{" "}
                    </li>
                  )}
                  {user.thirdLink && (
                    <li>
                      {" "}
                      <a href={user.thirdLink.url}>{user.thirdLink.label} </a>
                    </li>
                  )}
                  {user.fourthLink && (
                    <li>
                      {" "}
                      <a href={user.fourthLink.url}>
                        {user.fourthLink.label}{" "}
                      </a>{" "}
                    </li>
                  )}
                  {user.fifthLink && (
                    <li>
                      {" "}
                      <a href={user.fourthLink.url}>{user.fifthLink.label} </a>
                    </li>
                  )} */}
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
    </div>
  );
}
