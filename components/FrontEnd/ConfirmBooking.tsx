"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface ConfirmationPageProps {
  userDetails: {
    fullName: string;
    email: string;
    phone: string;
    payment: string;
  };
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  userDetails,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Booking Confirmation</h3>
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Your Details</h4>
        <p><span className="text-green-600 font-bold">Full Name:</span> {userDetails.fullName}</p>
        <p><span className="text-green-600 font-bold">Email:</span> {userDetails.email}</p>
        <p><span className="text-green-600 font-bold">Phone Number:</span> {userDetails.phone}</p>
        <p><span className="text-green-600 font-bold">Payment Method:</span> {userDetails.payment}</p>
      </div>
      <Button onClick={() => setIsVisible(true)}>Confirm Booking</Button>
      {isVisible && (
        <p className="text-green-600 font-bold">
          Your booking has been confirmed!
        </p>
      )}
    </div>
  );
};