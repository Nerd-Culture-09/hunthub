"use client";

import React, { useState } from "react";
import { RoomCarouselDemo } from "./RoomCarousel";
import { Button } from "@/components/ui/button";
import { Timeline } from "./BookTimeline";
import { ConfirmationPage } from "./ConfirmBooking";
import { Bath, Bed, Table, Wifi } from 'lucide-react';
import BookingForm from "./BookingForm";

interface DummyContentProps {
  category: string;
  title: string;
  images: string[];
  price: string;
  amenities: string[];
  roomId: string;
}

export const DummyContent: React.FC<DummyContentProps> = ({
  category,
  title,
  images,
  price,
  amenities,
  roomId
}) => {
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState<{
    fullName: string;
    email: string;
    payment: string;
    phone: string;
  }>({
    fullName: "",
    email: "",
    payment: "",
    phone: "",
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Function to update user details from the booking form
  const updateUserDetails = (details: {
    fullName: string;
    email: string;
    phone: string;
    payment: string;
  }) => {
    setUserDetails(details);
    handleNextStep();  // Move to the confirmation page
  };

  const amenityIcons: Record<string, JSX.Element> = {
    Wifi: <Wifi className="w-5 h-5 text-blue-600" />,
    Bed: <Bed className="w-5 h-5 text-blue-600" />,
    Shower: <Bath className="w-5 h-5 text-blue-600" />,
    Table: <Table className="w-5 h-5 text-blue-600" />,
  };

  console.log('Room ID passed to DummyContent:', roomId);

  return (
    <>
      <Timeline currentStep={step} />
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        {step === 1 && (
          <div className="lg:w-3/4">
            <div className="-mt-28">
              <RoomCarouselDemo images={images} />
              <div className="w-full flex justify-center p-5">
                <Button onClick={handleNextStep}>Book now</Button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="lg:w-3/4">
            <BookingForm 
              roomId={roomId} 
              roomTitle={title}
              onNextStep={updateUserDetails} 
            />
          </div>
        )}

        {step === 3 && (
          <div className="lg:w-3/4 mt-8 lg:mt-0 lg:block"  >
            <ConfirmationPage userDetails={userDetails} /> 
          </div>
        )}

        {step === 1 && (
          <div className="lg:w-1/2 mt-8 lg:mt-10">
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl">
              <h3 className="text-neutral-700 text-2xl font-bold">
                {category}
              </h3>
              <h4 className="text-neutral-700 dark:text-neutral-200 text-lg mb-4">
                {title}
                <h1>
                  Price: <span className="text-green-600 font-semibold">M{price}</span>
                </h1>
              </h4>
              <div className="room-amenities">
                <h4 className="font-bold">Amenities:</h4>
                <ul className="flex space-x-4">
                  {amenities.map((amenity, index) => (
                    <li key={index} className="grid grid-col pt-4">
                      {amenityIcons[amenity] || <span>{amenity}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
