"use client"

import React from "react";
import Link from "next/link";

const Footer = () => {
  const footerNavs = [
    {
      label: "Company",
      items: [
        { href: "javascript:void()", name: "Team", link: "/team-all" },
        { href: "javascript:void()", name: "Career", link: "/careers" },
      ],
    },
    {
      label: "Resources",
      items: [
        { href: "javascript:void()", name: "Contact", link: "/contact" }, 
        { href: "javascript:void()", name: "Pricing", link: "/pricing" },
      ],
    },
    {
      label: "About",
      items: [
        { href: "javascript:void()", name: "Terms", link: "/termsv" }, 
        { href: "javascript:void()", name: "About Us", link: "/about" }, 
      ],
    },
  ];

  return (
    <footer className="text-gray-500 bg-transparent px-4 py-2 mx-auto md:px-8 border-t">
      <div className="gap-4 justify-between md:flex">
        {/* Footer Navigation */}
        <div className="flex-1">
          <div className="max-w-xs">
            <img src="/logo.png" className="w-24" alt="The Valley Guest House Logo" />
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="block pt-2 pb-1 text-sm">
              Sign up for discounts and more updates
            </label>
            <div className="max-w-sm flex items-center border rounded-md p-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 outline-none text-sm"
              />
              <button className="p-2 rounded-md text-white bg-indigo-600 outline-none shadow-md focus:shadow-none sm:px-3">
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <div className="flex-1 mt-6 space-y-4 items-center justify-between sm:flex md:space-y-0 md:mt-0">
          {footerNavs.map((item, idx) => (
            <ul className="space-y-2 text-sm" key={idx}>
              <h4 className="text-gray-800 font-medium">{item.label}</h4>
              {item.items.map((el, idx) => (
                <li key={idx}>
                  {el.link ? (
                    <Link href={el.link} className="hover:underline hover:text-indigo-600">
                      {el.name}
                    </Link>
                  ) : (
                    <Link href={el.href} className="hover:underline hover:text-indigo-600">
                      {el.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="flex-1">
          
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d427.93005782607394!2d27.492784852319357!3d-29.304455527907236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e1!4m3!3m2!1d-29.3044156!2d27.4930644!4m3!3m2!1d-29.3100001!2d27.4799995!5e0!3m2!1sen!2s!4v1693156314791!5m2!1sen!2s"
              width="100%"
              height="140"
              loading="lazy"
              className="border rounded-md"
              style={{ border: 0 }}
              allowFullScreen={true}
            >
            </iframe>
          
        </div>
      </div>

      <div className="mt-4 py-4 border-t items-center justify-between sm:flex">
        <div className="mt-2 text-sm sm:mt-0">
          &copy; {new Date().getFullYear()} The Valley Guest House All rights reserved.
        </div>
        <div className="mt-4 sm:mt-0">
          <ul className="flex items-center space-x-2">
            {/* Social Media Icons */}
            {/* Your social media icons code here */}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
