"use server"

import { prismaClient } from "@/lib/db";
import { ReservationProps, houseProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createhouse(data: houseProps) {
    try {
      console.log('Data received by createhouse:', data); // Log incoming data
      
      // Check if house with the same title already exists
      const existinghouse = await prismaClient.house.findFirst({
        where: {
          title: data.title
        },
      });
  
      console.log('Existing house found:', existinghouse); // Log if house already exists
  
      if (existinghouse) {
        console.log('house already exists with this title:', data.title); // Log duplicate house error
        return {
          data: null,
          status: 409,
          error: "house already exists with this title"
        };
      }
      // Convert amenities if necessary
      const amenities = typeof data.amenities === 'string' 
        ? data.amenities.split(',').map(amenity => amenity.trim()) // Convert comma-separated string to array
        : (data.amenities as string[]).map(amenity => amenity.trim()); // Assume it's already an array
  
      console.log('Formatted amenities:', amenities); // Log formatted amenities
  
      // Create new house in the database
      const newhouse = await prismaClient.house.create({
        data: {
          title: data.title,
          description: data.description,
          image: data.imageUrl,
          category: data.category.toUpperCase() as "NORTH" | "SOUTH",
          price: data.price,
          amenities,
        },
      });
  
      console.log('New house created:', newhouse);
  
      return {
        data: newhouse,
        status: 201,
        error: null,
      };
    } catch (error) {
      console.error('Error creating house:', error);
  
      return {
        data: null,
        status: 501,
        error: "house not created",
      };
    }
  }

// actions/houses.ts
export async function gethousesNorth() {
  try {
    const houses = await prismaClient.house.findMany({
      where: {
        category: 'NORTH', // Filter houses by the 'NORTH' category
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: houses,
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


export async function gethousesSouth() {
    try {
        const houses = await prismaClient.house.findMany({
            where: {
                category: 'SOUTH',
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            data: houses,
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

export async function updatehouseAvailability(id: string, isAvailable: boolean) {
  try {
    const updatedhouse = await prismaClient.house.update({
      where: { id },
      data: { isAvailable },
    });

    console.log(updatedhouse);
    return {
      data: updatedhouse,
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

export async function getAllhouses() {
  try {
    const houses = await prismaClient.house.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: houses,
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

export async function getAvailhouses() {
  try {
    const houses = await prismaClient.house.findMany({
      where: {
        isAvailable: true,  // Only fetch houses where isAvailable is true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: houses,
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
                numberOfhouses: parseInt(data.numberOfhouses, 10), // Convert numberOfhouses to integer
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

export async function deletehouse(id: string) {
  try {
      // Delete service with the specified ID from the database
      await prismaClient.house.delete({
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