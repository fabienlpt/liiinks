"use client";
import Header from "@/components/header";
import { User } from "@/lib/user.model";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { username: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [background, setBackground] = useState<string>("#F8F7F0");
  const [color, setColor] = useState<string>("#3C3C3C");
  const [fontFamily, setFontFamily] = useState<string>("Arial");

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
      setFontFamily(user.fontChoice);
    }
  }, [user]);

  return (
    <div
      className="min-h-screen pl-8 pt-4"
      style={{ background, color, fontFamily }}
    >
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
                <Image
                  src={user.avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full"
                  width={96}
                  height={96}
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-[#F8F7F0] border border-[#3B3B3B] mb-4 rounded-full">
                  <span className="text-3xl text-gray-600">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              {user.username && (
                <p className="font-bold text-xl">{user.username}</p>
              )}
              {user.bio && <p className="text-lg mb-4">{user.bio}</p>}
              <div>
                <h1>Réseaux sociaux</h1>
                <ul>
                  {user.socialMedias.map((link) => (
                    <li
                      key={link.label}
                      className="border border-black rounded-full border-solid border-opacity-100 border-width-1 mb-2 flex justify-center items-center w-60 h-20 bg-white bg-opacity-20"
                    >
                      <a href={link.url}>{link.label}</a>
                    </li>
                  ))}
                  {user.links.map((link) => (
                    <li
                      key={link.label}
                      className="border border-black rounded-full border-solid border-opacity-100 border-width-1 mb-2 flex justify-center items-center w-60 h-20"
                    >
                      <a href={link.url}>{link.label}</a>
                    </li>
                  ))}
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
