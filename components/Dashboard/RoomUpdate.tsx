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
import { updatehouseAvailability, deletehouse } from "@/actions/house"; // Make sure these are client-side safe
import { Button } from "../ui/button";

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

interface houseUpdateProps {
  houses: house[]; // Expect houses to be passed from the server
}

export default function HouseUpdate({ houses }: houseUpdateProps) {
  // Hooks should always be called, even if the array is empty
  const [houseList, sethouseList] = useState<house[]>(houses); // Use initial houses passed from the server
  const [updatinghouseId, setUpdatinghouseId] = useState<string | null>(null);
  const [deletinghouseId, setDeletinghouseId] = useState<string | null>(null);

  // Add this return block to check for empty house list
  if (!houses || houses.length === 0) {
    return <p>No houses available.</p>;
  }

  const handleUpdateAvailability = async (
    houseId: string,
    isAvailable: boolean
  ) => {
    setUpdatinghouseId(houseId);
    const response = await updatehouseAvailability(houseId, isAvailable);
    if (response.status === 200) {
      sethouseList((prevhouses) =>
        prevhouses.map((house) =>
          house.id === houseId ? { ...house, isAvailable } : house
        )
      );
    }
    setUpdatinghouseId(null);
  };

  const handleDeletehouse = async (houseId: string) => {
    setDeletinghouseId(houseId);
    const response = await deletehouse(houseId);
    if (response.status === 200) {
      sethouseList((prevhouses) => prevhouses.filter((house) => house.id !== houseId));
    }
    setDeletinghouseId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {houseList.map((house) => (
        <Card key={house.id} className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{house.title}</CardTitle>
            <CardDescription className="text-gray-500">{house.description}</CardDescription>
            <p className={`text-sm font-semibold ${house.isAvailable ? "text-green-500" : "text-red-500"}`}>
              {house.isAvailable ? "Available" : "Booked"}
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
                  <AlertDialogTitle>Update availability for {house.title}</AlertDialogTitle>
                  <AlertDialogDescription>
                    Click on Available to mark the house available for booking or Booked to mark the house unavailable for booking.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600"
                    onClick={() => handleUpdateAvailability(house.id, false)}
                    disabled={updatinghouseId === house.id}
                  >
                    Booked
                  </AlertDialogAction>
                  <AlertDialogAction
                    className="bg-blue-600"
                    onClick={() => handleUpdateAvailability(house.id, true)}
                    disabled={updatinghouseId === house.id}
                  >
                    Available
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Delete house Button */}
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive">
                  Delete house
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete this house?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600"
                    onClick={() => handleDeletehouse(house.id)}
                    disabled={deletinghouseId === house.id}
                  >
                    {deletinghouseId === house.id ? "Deleting..." : "Delete"}
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
