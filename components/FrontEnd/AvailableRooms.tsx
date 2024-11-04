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
import { getAvailRooms } from "@/actions/rooms";
import Link from "next/link";

interface Room {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  amenities: string[];
  isAvailable: boolean;
}

export default function AvailableRoomCards() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await getAvailRooms(); // Fetch all available rooms
      if (response.data) {
        setRooms(response.data);
      }
    };

    fetchRooms();
  }, []);

  const handleReserveClick = (room: Room) => {
    setSelectedRoom(room); // Select the room with its `id`
    setIsModalOpen(true); // Open the modal for booking
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="mt-8 scroll-m-20 text-3xl ml-5 font-semibold tracking-tight">
          Available Rooms
        </h1>
        <div className="mt-9 mr-5">
          <Link href="all-rooms">
            <button className="px-6 py-2 text-blue-500 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
              View All
            </button>
          </Link>
        </div>
      </div>
      <div className="pt-6 py-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {rooms.map((room) => (
          <Card key={room.id} className="w-[310px] mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{room.title}</CardTitle>
              <CardDescription className="text-gray-500">{room.description}</CardDescription>
              <p className={`text-sm font-semibold ${room.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                {room.isAvailable ? 'Available' : 'Booked'}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
                <Image
                  src={room.image}
                  alt="Room Image"
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 content-start text-sm">
                {room.amenities.includes("Bed") && (
                  <AmenityItem>
                    <Bed className="w-4 h-4 font-bold text-blue-600" /> Bed
                  </AmenityItem>
                )}
                {room.amenities.includes("Table") && (
                  <AmenityItem>
                    <Table className="w-4 h-4 text-blue-600" /> Table
                  </AmenityItem>
                )}
                {room.amenities.includes("Wifi") && (
                  <AmenityItem>
                    <Wifi className="w-4 h-4 text-blue-600" /> Wifi
                  </AmenityItem>
                )}
                {room.amenities.includes("Shower") && (
                  <AmenityItem>
                    <Bath className="w-4 h-4 text-blue-600" /> Shower
                  </AmenityItem>
                )}
              </div>
              <div className="pt-10 flex justify-between">
                <Button
                  onClick={() => handleReserveClick(room)}
                  className={`py-2 px-4 rounded-lg ${isLoading ? "bg-gray-500" : "bg-blue-600"} text-white`}
                  disabled={isLoading}
                >
                  {isLoading ? "please wait..." : "Reserve"}
                </Button>
                <p className="border border-green-500 rounded-lg w-16">
                  <span className="flex justify-center pt-2 font-extrabold">M{room.price}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
      )}

    </>
  );
}
