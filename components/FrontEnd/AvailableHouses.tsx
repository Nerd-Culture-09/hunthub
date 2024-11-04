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
import { getAvailhouses } from "@/actions/house";
import Link from "next/link";

interface house {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  amenities: string[];
  isAvailable: boolean;
}

export default function AvailablehouseCards() {
  const [houses, sethouses] = useState<house[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedhouse, setSelectedhouse] = useState<house | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchhouses = async () => {
      const response = await getAvailhouses(); // Fetch all available houses
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
    setIsModalOpen(false);
  };

  return (
    <>
<<<<<<< HEAD:components/FrontEnd/AvailableHouses.tsx
      <div className="flex justify-between items-center">
        <h1 className="mt-8 scroll-m-20 text-3xl ml-5 font-semibold tracking-tight">
          Available houses
        </h1>
=======
      <div className="flex justify-center items-center">
        <h5 className="mt-8 scroll-m-20 text-xl text-center ml-5 font-semibold tracking-tight">
          Available Rentals
        </h5>
>>>>>>> 179bfb8e32bc23bcb92163032e51c96ffc0a3e14:components/FrontEnd/AvailableRooms.tsx
        <div className="mt-9 mr-5">
          <Link href="all-houses">
            <button className="px-6 py-2 text-blue-500 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
              View All
            </button>
          </Link>
        </div>
      </div>
      <div className="pt-6 py-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
<<<<<<< HEAD:components/FrontEnd/AvailableHouses.tsx
        {houses.map((house) => (
          <Card key={house.id} className="w-[310px] mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{house.title}</CardTitle>
              <CardDescription className="text-gray-500">{house.description}</CardDescription>
              <p className={`text-sm font-semibold ${house.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                {house.isAvailable ? 'Available' : 'Booked'}
=======
        {rooms.map((room) => (
          <Card key={room.id} className="w-[350px] mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {room.title}
              </CardTitle>
              <CardDescription className="text-gray-500">
                {room.description}
              </CardDescription>
              <p
                className={`text-sm font-semibold ${
                  room.isAvailable ? "text-green-500" : "text-red-500"
                }`}
              >
                {room.isAvailable ? "Available" : "Booked"}
>>>>>>> 179bfb8e32bc23bcb92163032e51c96ffc0a3e14:components/FrontEnd/AvailableRooms.tsx
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
<<<<<<< HEAD:components/FrontEnd/AvailableHouses.tsx
                  onClick={() => handleReserveClick(house)}
                  className={`py-2 px-4 rounded-lg ${isLoading ? "bg-gray-500" : "bg-blue-600"} text-white`}
=======
                  onClick={() => handleReserveClick(room)}
                  className={`py-2 px-4 rounded-lg ${
                    isLoading ? "bg-gray-500" : "bg-blue-600"
                  } text-white`}
>>>>>>> 179bfb8e32bc23bcb92163032e51c96ffc0a3e14:components/FrontEnd/AvailableRooms.tsx
                  disabled={isLoading}
                >
                  {isLoading ? "please wait..." : "Reserve"}
                </Button>
                <p className="border border-green-500 rounded-lg w-16">
<<<<<<< HEAD:components/FrontEnd/AvailableHouses.tsx
                  <span className="flex justify-center pt-2 font-extrabold">M{house.price}</span>
=======
                  <span className="flex justify-center pt-2 font-extrabold">
                    M{room.price}
                  </span>
>>>>>>> 179bfb8e32bc23bcb92163032e51c96ffc0a3e14:components/FrontEnd/AvailableRooms.tsx
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

<<<<<<< HEAD:components/FrontEnd/AvailableHouses.tsx
      {isModalOpen && selectedhouse && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative bg-white p-6 rounded-lg w-full max-w-xl">
      <Button 
        className="absolute top-7 right-1 text-sm bg-transparent" 
        onClick={closeModal}
      >
        <FaTimes className="text-xl text-black" />
      </Button>
      <DummyContent
        category={selectedhouse.category}
        title={selectedhouse.title}
        images={[selectedhouse.image]}
        price={selectedhouse.price}
        amenities={selectedhouse.amenities}
        houseId={selectedhouse.id}
      />
    </div>
  </div>
=======
      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-xl">
            <Button
              className="absolute top-7 right-1 text-sm bg-transparent"
              onClick={closeModal}
            >
              <FaTimes className="text-xl text-black" />
            </Button>
            <DummyContent
              category={selectedRoom.category}
              title={selectedRoom.title}
              images={[selectedRoom.image]}
              price={selectedRoom.price}
              amenities={selectedRoom.amenities}
              roomId={selectedRoom.id}
            />
          </div>
        </div>
>>>>>>> 179bfb8e32bc23bcb92163032e51c96ffc0a3e14:components/FrontEnd/AvailableRooms.tsx
      )}
    </>
  );
}
