"use client";

import { useForm } from "react-hook-form"; // Form handling library
import TextInput from "@/components/FormInputs/TextInput"; // Custom text input component
import SubmitButton from "@/components/FormInputs/SubmitButton"; // Custom submit button component
import { useState } from "react"; // State management library
import { Button } from "../ui/button"; // Button component
import Link from "next/link"; // Link component from Next.js
import { X } from "lucide-react"; // Icon component from Lucide React
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation"; // Router hook from Next.js
import { Input } from "../ui/input";
import ImageInput from "../FormInputs/ImageInput"; // Custom image input component
import { RoomProps } from "@/types/types";
import { createRoom } from "@/actions/rooms";

export default function RoomForm2({ title }: { title: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(""); // State for image URL

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomProps>();

  const router = useRouter(); // Router instance

  // Function to handle form submission
async function onSubmit(data: RoomProps) {
  setIsLoading(true); // Set loading state to true
  data.imageUrl = imageUrl; // Set image URL in form data

  console.log("Form data submitted:", data); // Debugging: log form data

  try {
    // Call the createRoom API with form data
    const response = await createRoom(data);

    console.log("API Response:", response); // Debugging: log API response

    if (response.status === 201) {
      toast.success("Room Created Successfully");
      reset(); // Reset form fields
      router.push("/dashboard/south"); // Redirect to rooms dashboard
    } else if (response.status === 409) {
      toast.error("Room with this slug already exists."); // Handle conflict
    } else {
      toast.error("Failed to create room."); // Handle general errors
    }
  } catch (error) {
    console.error("Error in onSubmit:", error); // Debugging: log any errors caught in try/catch
    toast.error("Error creating room. Please try again.");
  } finally {
    setIsLoading(false); // Reset loading state
  }
}


  return (
    <div className="w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm py-4 border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between px-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">{title}</h1>
          {/* Button to cancel form submission */}
          <Button type="button" asChild variant={"outline"}>
            <Link href="/dashboard/south">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Form for submitting room data */}
      <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-4 mx-auto">
        <div className="grid gap-4 grid-cols-2">
          {/* Text input for room title */}
          <TextInput
            label="Room Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter Room Title"
          />
          {/* Text input for room description */}
          <TextInput
            label="Room Description"
            register={register}
            name="description"
            errors={errors}
            placeholder="Enter Room Description"
          />
          {/* Image input for room image */}
          <ImageInput
            label="Room Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="roomImage"
          />
          {/* Text input for price */}
          <TextInput
            label="Price (M)"
            register={register}
            name="price"
            errors={errors}
            placeholder="Enter Price"
          />
          {/* Text input for category */}
          <TextInput
            label="Category"
            register={register}
            name="category"
            errors={errors}
            placeholder="Enter Category (e.g., South or North)"
          />
        </div>

        {/* Amenities input */}
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">Amenities</label>
          <Input
            {...register("amenities", { required: "Amenities are required" })}
            className="w-full px-3 py-2 mt-1 border rounded-md"
            placeholder="Enter amenities separated by commas (e.g., Bed, Wifi, Table)"
          />
          {errors.amenities && (
            <p className="text-sm text-red-600 mt-1">{errors.amenities.message}</p>
          )}
        </div>

        <div className="mt-8 flex justify-between gap-4 items-center">
          {/* Button to cancel form submission */}
          <Button asChild variant={"outline"}>
            <Link href="/dashboard/south">Cancel</Link>
          </Button>
          <SubmitButton
            title={"Create Room"}
            isLoading={isLoading}
            LoadingTitle={"Saving please wait..."}
          />
          <Toaster />
        </div>
      </form>
    </div>
  );
}