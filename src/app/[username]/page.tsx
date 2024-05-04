"use client";
import Preview from "@/components/preview";
import { User } from "@/lib/user.model";
import axios from "axios";
import Link from "next/link";
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
      <div className="flex flex-col items-center p-15">
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <Preview
            avatar={user.avatar}
            username={user.username}
            bio={user.bio}
            socialMedias={user.socialMedias}
            links={user.links}
            color={user.mainColor}
          />
        ) : (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Utilisateur non trouvé
          </h2>
        )}
      </div>
    </div>
  );
}
