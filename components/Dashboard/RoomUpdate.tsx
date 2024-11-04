"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateRoomAvailability, deleteRoom } from "@/actions/rooms"; // Make sure these are client-side safe
import { Button } from "../ui/button";

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

interface RoomUpdateProps {
  rooms: Room[]; // Expect rooms to be passed from the server
}

export default function RoomUpdate({ rooms }: RoomUpdateProps) {
  // Hooks should always be called, even if the array is empty
  const [roomList, setRoomList] = useState<Room[]>(rooms); // Use initial rooms passed from the server
  const [updatingRoomId, setUpdatingRoomId] = useState<string | null>(null);
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);

  // Add this return block to check for empty room list
  if (!rooms || rooms.length === 0) {
    return <p>No rooms available.</p>;
  }

  const handleUpdateAvailability = async (
    roomId: string,
    isAvailable: boolean
  ) => {
    setUpdatingRoomId(roomId);
    const response = await updateRoomAvailability(roomId, isAvailable);
    if (response.status === 200) {
      setRoomList((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId ? { ...room, isAvailable } : room
        )
      );
    }
    setUpdatingRoomId(null);
  };

  const handleDeleteRoom = async (roomId: string) => {
    setDeletingRoomId(roomId);
    const response = await deleteRoom(roomId);
    if (response.status === 200) {
      setRoomList((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
    }
    setDeletingRoomId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {roomList.map((room) => (
        <Card key={room.id} className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{room.title}</CardTitle>
            <CardDescription className="text-gray-500">{room.description}</CardDescription>
            <p className={`text-sm font-semibold ${room.isAvailable ? "text-green-500" : "text-red-500"}`}>
              {room.isAvailable ? "Available" : "Booked"}
            </p>
          </CardHeader>
          <CardContent className="flex gap-4">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button>
                  Update Availability
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Update availability for {room.title}</AlertDialogTitle>
                  <AlertDialogDescription>
                    Click on Available to mark the room available for booking or Booked to mark the room unavailable for booking.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600"
                    onClick={() => handleUpdateAvailability(room.id, false)}
                    disabled={updatingRoomId === room.id}
                  >
                    Booked
                  </AlertDialogAction>
                  <AlertDialogAction
                    className="bg-blue-600"
                    onClick={() => handleUpdateAvailability(room.id, true)}
                    disabled={updatingRoomId === room.id}
                  >
                    Available
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Delete Room Button */}
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive">
                  Delete Room
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete this room?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600"
                    onClick={() => handleDeleteRoom(room.id)}
                    disabled={deletingRoomId === room.id}
                  >
                    {deletingRoomId === room.id ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
