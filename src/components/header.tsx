import React from "react";
import { FaBars } from "react-icons/fa";

interface HeaderProps {
  isConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({ isConnected }) => {
  return (
    <header className="bg-gray-800 text-white w-[80%] rounded-full">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-xl font-bold">
          <a href="/" className="hover:text-gray-400">
            Liiinks
          </a>
        </h1>
        <nav className="flex items-center space-x-4">
          {isConnected ? (
            <a href="/account" className="hover:text-gray-400">
              Compte
            </a>
          ) : (
            <>
              <a href="/login" className="hover:text-gray-400">
                Login
              </a>
              <a href="/signup" className="hover:text-gray-400">
                Signup
              </a>
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
