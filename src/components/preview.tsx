"use client";
import Image from "next/image";
import React from "react";

interface IProps {
  avatar: string;
  username: string;
  bio: string;
  socialMedias: { label: string; url: string }[];
  links: { label: string; url: string }[];
  color: string;
}

const Preview: React.FC<IProps> = ({
  avatar,
  username,
  bio,
  socialMedias,
  links,
  color,
}) => {
  return (
    <div className="max-w-md w-full space-y-8">
      <div className="flex flex-col items-center justify-center">
        {avatar ? (
          <Image
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full "
            style={{ border: "1px solid " + color }}
            width={96}
            height={96}
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center bg-[#F8F7F0] border border-[#3B3B3B] mb-4 rounded-full">
            <span className="text-3xl text-gray-600">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {username && <p className="font-bold text-xl">{username}</p>}
        {bio && <p className="text-lg mb-4 italic">{bio}</p>}
        <div>
          <ul>
            {socialMedias.map((link) => (
              <a key={link.label} href={link.url} className="mb-4 block">
                <li
                  key={link.label}
                  className="bg-white hover:scale-x-105 bg-opacity-[0.5] shadow-lg rounded-full border-solid border-opacity-100 border-width-1 mb-2 flex justify-center items-center w-[25rem] h-[5rem]"
                  style={{ border: "1px solid " + color }}
                >
                  {link.label}
                </li>
              </a>
            ))}
            {links.map((link) => (
              <a key={link.label} href={link.url} className="mb-4 block">
                <li
                  key={link.label}
                  className="bg-white hover:scale-x-105 bg-opacity-[0.5] shadow-lg rounded-full border-solid border-opacity-100 border-width-1 mb-2 flex justify-center items-center w-[25rem] h-[5rem]"
                  style={{ border: "1px solid " + color }}
                >
                  {link.label}
                </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Preview;
