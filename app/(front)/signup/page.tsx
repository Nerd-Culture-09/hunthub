"use client";
import SignupFormDemo from "@/components/example/signup-form-demo";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Sign Up
        </h1>
        <SignupFormDemo />
      </div>
    </div>
  );
};

export default SignUpPage;
