"use server";

import { prismaClient } from "@/lib/db";

// Function to create a new booking
export async function createBooking(formData: any) {
  console.log("Booking Form Data:", formData); // Debugging line
  const {
    roomId,
    checkInDate,
    checkOutDate,
    fullName,
    email,
    phoneNumber,
    bookingFor,
    paymentMethod,
  } = formData;

  // Validate roomId
  if (!roomId) {
    return {
      data: null,
      status: 400,
      error: "Invalid or missing roomId",
    };
  }

  try {
    // Fetch the room to get the title
    const room = await prismaClient.room.findUnique({
      where: { id: roomId },
      select: { title: true }, // Only select the room title
    });

    if (!room) {
      return {
        data: null,
        status: 404,
        error: "Room not found",
      };
    }

    // Create a new booking in the database
    const newBooking = await prismaClient.booking.create({
      data: {
        roomId, // Ensure roomId is provided
        checkInDate: new Date(checkInDate), // Ensure dates are in correct format
        checkOutDate: new Date(checkOutDate),
        fullName,
        email,
        phoneNumber,
        bookingFor,
        paymentMethod,
        roomTitle: room.title, // Add the room title to the booking
      },
    });

    // Log the newly created booking and return success response
    console.log(newBooking);
    return {
      data: newBooking,
      status: 201,
      error: null,
    };
  } catch (error) {
    // Handle errors and return error response
    console.log(error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong",
    };
  }
}

// Function to fetch bookings by specific fields
export async function getFilteredBookings() {
  try {
    const bookings = await prismaClient.booking.findMany({
      select: {
        fullName: true,
        phoneNumber: true,
        email: true,
        paymentMethod: true,
        checkInDate: true,
        checkOutDate: true,
        room: {
          select: {
            title: true,
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: bookings,
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

export async function getFilteredReservations() {
  try {
    const reservation = await prismaClient.reservation.findMany({
      select: {
        fullName: true,
        checkIn: true,
        checkOut: true,
        numberOfRooms: true,
        branch: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: reservation,
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
