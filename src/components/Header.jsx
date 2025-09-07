"use client";

import React, { useState, useEffect } from "react";
import { FaAlignJustify } from "react-icons/fa";
import Link from "next/link";
import AddProjectForm from "./AddProjectForm";
import {

  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { useDispatch } from "react-redux";
import { triggerReload } from "@/redux/projectsSlice";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const {user , isLoaded: userLoaded} = useUser();
  const dispatch = useDispatch();

  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === "admin";

  const handleToggle = () => {
  
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 0) {
        header?.classList.add("shadow-md");
      } else {
        header?.classList.remove("shadow-md");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = ["home", "about", "portfolio", "services", "contact"];

  return (
    <header className="fixed top-0 left-0 w-full py-3 bg-white z-11 transition-shadow duration-300">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold font-pacifico">
          JUN<span className="text-blue-600">AID</span>
        </Link>

        

       

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {sections.map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className="text-lg text-gray-800 hover:text-blue-500"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        {toggle && (
          <div className="fixed inset-0 bg-white shadow-lg z-20 flex flex-col p-4 space-y-4 md:hidden">
            {sections.map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className="text-lg text-gray-800 hover:text-blue-500"
                onClick={handleToggle}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
          </div>
        )}
   

       <div className="flex gap-4">
       {isAdmin && <AddProjectForm  clickTriger={() => dispatch(triggerReload())} />}

        <div className="hidden md:flex items-center space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex space-x-4">
              <SignInButton >
                Login
                </SignInButton >
            </div>
          </SignedOut>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-3xl text-gray-800 cursor-pointer"
          onClick={handleToggle}
        >
          <FaAlignJustify />
        </div>
       </div>
   </div>
    </header>
  );
};

export default Header;
