"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Timeline } from "./BookTimeline";
import { ConfirmationPage } from "./ConfirmBooking";
import { Bath, Droplets, Fence, Zap, ShowerHead } from "lucide-react";
import BookingForm from "./BookingForm";
import { HouseCarouselDemo } from "./RoomCarousel";

interface DummyContentProps {
  category: string;
  title: string;
  images: string[];
  price: string;
  amenities: string[];
  houseId: string;
}

export const DummyContent: React.FC<DummyContentProps> = ({
  category,
  title,
  images,
  price,
  amenities,
  houseId
}) => {
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState<{
    fullName: string;
    email: string;
    phone: string;
  }>({
    fullName: "",
    email: "",
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
  }) => {
    setUserDetails(details);
    handleNextStep();
  };

  const amenityIcons: Record<string, JSX.Element> = {
    Fence: <Fence className="w-5 h-5 text-blue-600" />,
    Droplets: <Droplets className="w-5 h-5 text-blue-600" />,
    Bath: <Bath className="w-5 h-5 text-blue-600" />,
    Zap: <Zap className="w-5 h-5 text-blue-600" />,
    ShowerHead: <ShowerHead className="w-5 h-5 text-blue-600" />,
  };

  console.log('house ID passed to DummyContent:', houseId);

  return (
    <>
      <Timeline currentStep={step} />
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        {step === 1 && (
          <div className="lg:w-3/4">
            <div className="-mt-28">
              <HouseCarouselDemo images={images} />
              <div className="w-full flex justify-center p-5">
                <Button onClick={handleNextStep}>Book now</Button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="lg:w-3/4">
            <BookingForm 
              houseId={houseId} 
              houseTitle={title}
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
                {title}
              </h3>
                <h1>
                  Price: <span className="text-green-600 font-semibold">M{price}</span>
                </h1>
              <div className="house-amenities">
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
