"use server"

import { prismaClient }  from "@/lib/db";
import generateSlug from "@/lib/generateSlug";
import { RegisterInputProps, ReviewProps } from "@/types/types";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export async function createUser(formdata: RegisterInputProps) {
  const {
    fullName,
    email,
    password,
    phone,
    role,
  } = formdata;

  try {
    // Check if user with the same email exists
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        data: null,
        error: `User with this email (${email}) already exists in the Database`,
        status: 409,
      };
    }

    // Encrypt the Password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const userToken = generateToken();

    // Create the new user in the database
    const newUser = await prismaClient.user.create({
      data: {
          name: fullName,
          slug: generateSlug(fullName),
          email,
          phone,
          password: hashedPassword,
          role,
          token: userToken,
      },
  });

    return {
      data: newUser,
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: "Something went wrong",
      status: 500,
    };
  }
}

export async function createReview(formdata: ReviewProps) {
  const { fullName, email, occupation, message } = formdata;

  try {
    // Check if a review with the same email exists (optional step, depending on your use case)
    const existingReview = await prismaClient.review.findUnique({
      where: {
        email,
      },
    });

    if (existingReview) {
      return {
        data: null,
        error: `Review from this email (${email}) already exists in the Database`,
        status: 409,
      };
    }

    // Create the new review in the database
    const newReview = await prismaClient.review.create({
      data: {
        fullName,
        email,
        occupation,
        message,
      },
    });

    return {
      data: newReview,
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: "Something went wrong",
      status: 500,
    };
  }
}

export async function getAllReviews() {
  try {
    const reviews = await prismaClient.review.findMany({
      select: {
        fullName: true,
        occupation: true,
        message: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: reviews,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong",
    };
  }
}
