"use client";

import React, { useEffect, useState } from "react";
import AmenityItem from "@/components/FrontEnd/AmenityItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bath, Bed, Table, Wifi } from "lucide-react";
import Image from "next/image";
import { DummyContent } from "./DummyContent";
import { Button } from "../ui/button";
import { FaTimes } from "react-icons/fa";
import { gethousesSouth } from "@/actions/house"; // Importing the gethouses function

interface house {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  amenities: string[];
  isAvailable: boolean; // Add the isAvailable field here
}

export default function SouthhouseCards() {
  const [houses, sethouses] = useState<house[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedhouse, setSelectedhouse] = useState<house | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchhouses = async () => {
      const response = await gethousesSouth();
      if (response.data) {
        sethouses(response.data);
      }
    };

    fetchhouses();
  }, []);

  const handleReserveClick = (house: house) => {
    setSelectedhouse(house); // Select the house with its `id`
    setIsModalOpen(true); // Open the modal for booking
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal when clicked
  };

  return (
    <>
      <div className="pt-6 py-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {houses.map((house) => (
          <Card key={house.id} className="w-[310px] mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{house.title}</CardTitle>
              <CardDescription className="text-gray-500">{house.description}</CardDescription>
              <p className={`text-sm font-semibold ${house.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                {house.isAvailable ? 'Available' : 'Booked'}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
                <Image
                  src={house.image}
                  alt="house Image"
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 content-start text-sm">
                {house.amenities.includes("Bed") && (
                  <AmenityItem>
                    <Bed className="w-4 h-4 font-bold text-blue-600" /> Bed
                  </AmenityItem>
                )}
                {house.amenities.includes("Table") && (
                  <AmenityItem>
                    <Table className="w-4 h-4 text-blue-600" /> Table
                  </AmenityItem>
                )}
                {house.amenities.includes("Wifi") && (
                  <AmenityItem>
                    <Wifi className="w-4 h-4 text-blue-600" /> Wifi
                  </AmenityItem>
                )}
                {house.amenities.includes("Shower") && (
                  <AmenityItem>
                    <Bath className="w-4 h-4 text-blue-600" /> Shower
                  </AmenityItem>
                )}
              </div>
              <div className="pt-10 flex justify-between">
                <Button
                  onClick={() => handleReserveClick(house)}
                  className={`py-2 px-4 rounded-lg ${
                    isLoading ? "bg-gray-500" : "bg-blue-600"
                  } text-white`}
                  disabled={isLoading}
                >
                  {isLoading ? "please wait..." : "Reserve"}
                </Button>
                <p className="border border-green-500 rounded-lg w-16">
                  <span className="flex justify-center pt-2 font-extrabold">
                    M{house.price}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isModalOpen && selectedhouse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl">
            <Button className="absolute top-16 right-1 text-sm bg-transparent text-black" onClick={closeModal}>
              <FaTimes className="text-xl" />
            </Button>
            <DummyContent
              category={selectedhouse.category}
              title={selectedhouse.title}
              images={[selectedhouse.image]}
              price={selectedhouse.price}
              amenities={selectedhouse.amenities}
              houseId={selectedhouse.id} // Add houseId here for booking
            />
          </div>
        </div>
      )}
    </>
  );
}
