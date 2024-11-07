"use server";

import { prismaClient } from "@/lib/db";

// Function to create a new booking
export async function createBooking(formData: any) {
  console.log("Booking Form Data:", formData); // Debugging line
  const {
    houseId,
    fullName,
    email,
    phoneNumber,
    bookingFor,
  } = formData;

  // Validate houseId
  if (!houseId) {
    return {
      data: null,
      status: 400,
      error: "Invalid or missing houseId",
    };
  }

  try {
    // Fetch the house to get the title
    const house = await prismaClient.house.findUnique({
      where: { id: houseId },
      select: { title: true }, // Only select the house title
    });

    if (!house) {
      return {
        data: null,
        status: 404,
        error: "house not found",
      };
    }

    // Create a new booking in the database
    const newBooking = await prismaClient.booking.create({
      data: {
        houseId, // Ensure houseId is provided
        fullName,
        email,
        phoneNumber,
        bookingFor,
        houseTitle: house.title, // Add the house title to the booking
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
        house: {
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
        numberOfhouses: true,
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
