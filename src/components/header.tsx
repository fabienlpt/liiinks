"use client";
import { AuthContext } from "@/lib/AuthContext";
import Link from "next/link";
import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";

const Header: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="bg-gray-800 text-white w-[80%] rounded-full">
      <div className="container mx-auto flex items-center justify-between py-6 px-10">
        <h1 className="text-xl font-bold">
          <Link href="/" className="hover:text-gray-400">
            Liiinks
          </Link>
        </h1>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/myaccount" className="hover:text-gray-400">
                Compte
              </Link>
              <Link href="/myaccount/links" className="hover:text-gray-400">
                Mes liens
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
              <Link href="/signup" className="hover:text-gray-400">
                Signup
              </Link>
            </>
          )}
        </nav>
        <div className="md:hidden">
          <FaBars className="text-2xl" />
        </div>
      </div>
    </header>
  );
};

export default Header;
