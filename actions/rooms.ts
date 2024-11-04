"use server"

import { prismaClient } from "@/lib/db";
import { ReservationProps, RoomProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createRoom(data: RoomProps) {
    try {
      console.log('Data received by createRoom:', data); // Log incoming data
      
      // Check if room with the same title already exists
      const existingRoom = await prismaClient.room.findFirst({
        where: {
          title: data.title
        },
      });
  
      console.log('Existing room found:', existingRoom); // Log if room already exists
  
      if (existingRoom) {
        console.log('Room already exists with this title:', data.title); // Log duplicate room error
        return {
          data: null,
          status: 409,
          error: "Room already exists with this title"
        };
      }
      // Convert amenities if necessary
      const amenities = typeof data.amenities === 'string' 
        ? data.amenities.split(',').map(amenity => amenity.trim()) // Convert comma-separated string to array
        : (data.amenities as string[]).map(amenity => amenity.trim()); // Assume it's already an array
  
      console.log('Formatted amenities:', amenities); // Log formatted amenities
  
      // Create new room in the database
      const newRoom = await prismaClient.room.create({
        data: {
          title: data.title,
          description: data.description,
          image: data.imageUrl,
          category: data.category.toUpperCase() as "NORTH" | "SOUTH",
          price: data.price,
          amenities,
        },
      });
  
      console.log('New room created:', newRoom);
  
      return {
        data: newRoom,
        status: 201,
        error: null,
      };
    } catch (error) {
      console.error('Error creating room:', error);
  
      return {
        data: null,
        status: 501,
        error: "Room not created",
      };
    }
  }

// actions/rooms.ts
export async function getRoomsNorth() {
  try {
    const rooms = await prismaClient.room.findMany({
      where: {
        category: 'NORTH', // Filter rooms by the 'NORTH' category
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: rooms,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}


export async function getRoomsSouth() {
    try {
        const rooms = await prismaClient.room.findMany({
            where: {
                category: 'SOUTH',
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            data: rooms,
            status: 200,
            error: null,
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
            status: 500,
            error,
        };
    }
}

export async function updateRoomAvailability(id: string, isAvailable: boolean) {
  try {
    const updatedRoom = await prismaClient.room.update({
      where: { id },
      data: { isAvailable },
    });

    console.log(updatedRoom);
    return {
      data: updatedRoom,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong",
    };
  }
}

export async function getAllRooms() {
  try {
    const rooms = await prismaClient.room.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: rooms,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function getAvailRooms() {
  try {
    const rooms = await prismaClient.room.findMany({
      where: {
        isAvailable: true,  // Only fetch rooms where isAvailable is true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: rooms,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function createReservation(data: ReservationProps) {
    try {
        console.log('Data received by createReservation:', data); // Log incoming data

        // Check if reservation with the same fullName and checkIn date already exists
        const existingReservation = await prismaClient.reservation.findFirst({
            where: {
                fullName: data.fullName,
                checkIn: data.checkIn,
            },
        });

        console.log('Existing reservation found:', existingReservation); // Log if a reservation is found

        // If reservation exists, return conflict response
        if (existingReservation) {
            console.log('Reservation already exists for this guest and date:', data.fullName, data.checkIn);
            return {
                data: null,
                status: 409,
                error: "Reservation already exists for this guest and date",
            };
        }

        // Create new reservation if not found
        const newReservation = await prismaClient.reservation.create({
            data: {
                fullName: data.fullName,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                branch: data.branch,
                numberOfRooms: parseInt(data.numberOfRooms, 10), // Convert numberOfRooms to integer
            },
        });

        console.log('New reservation created:', newReservation);

        return {
            data: newReservation,
            status: 201,
            error: null,
        };
    } catch (error) {
        console.error('Error creating reservation:', error);

        return {
            data: null,
            status: 501,
            error: "Reservation not created",
        };
    }
}

export async function deleteRoom(id: string) {
  try {
      // Delete service with the specified ID from the database
      await prismaClient.room.delete({
         where:{
              id,
         },
      });

      // Invalidate cache for the services dashboard page
      revalidatePath("/dashboard/south")

      // Return success response
      return {
          ok: true,
          status: 200,
          error:null,
      };
  } catch (error) {
      // Handle errors and return error response
      console.log(error);
      return {
          data: null,
          status: 500,
          error,
      };
  }
}