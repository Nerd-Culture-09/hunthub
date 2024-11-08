"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react"; // Import useSession for authentication

const NavigationBar = () => {
  const [state, setState] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: session, status } = useSession(); // Retrieve session data

  const navigation = [
    { title: "Home", path: "/" },
    { title: "houses", path: "/all-houses" },
    { title: "Pricing", path: "/pricing" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full h-[70px] fixed top-0 z-50 transition-colors duration-300`}
    >
      <div className="items-center bg-white px-4 w-full mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between md:py-5 md:block">
          <div className="lg:-mt-4 pb-2 pt-1">
            <a href="/">
              <img
                src="/artibox.png"
                width={50}
                height={10}
                alt="The Valley logo"
              />
            </a>
          </div>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <div className="mt-12">
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <li className="bg-gray-100 p-4 rounded-xl">
                  <figure>
                    <div className="flex items-center gap-x-4">
                      <div>
                        <span className="block text-gray-800 font-semibold">
                          We can email you as soon as the house you're looking
                          for becomes available, if you are registered
                        </span>
                        <span className="flex gap-2 text-gray-600 text-sm mt-0.5">
                          <Link href="/register">
                            <Button
                              className="border border-blue-500 text-gray-600"
                              variant="ghost"
                            >
                              Register
                            </Button>
                          </Link>
                          {status === "unauthenticated" && (
                            <>
                              <Link href="/login">
                                <Button className="bg-blue-500 lg:w-[90px]">
                                  Login
                                </Button>
                              </Link>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <blockquote>
                      <p className="mt-6 text-gray-700"></p>
                    </blockquote>
                  </figure>
                </li>
              </ul>
            </div>
            {/* Show Dashboard link only if user is logged in and is admin */}
            {session?.user?.role === "ADMIN" && (
              <li className="text-gray-600 hover:text-indigo-600">
                <Link href="/dashboard">Dashboard</Link>
              </li>
            )}

            <div className="flex flex-col gap-y-4 gap-x-6 md:flex-row md:space-y-0">
              {/* Show login and register links only if the user is not logged in */}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
