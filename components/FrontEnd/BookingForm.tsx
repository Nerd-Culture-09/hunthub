"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import TextInput from "../FormInputs/TextInput";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import { SelectInput } from "../FormInputs/SelectInput";
import { BookingProps } from "@/types/types";
import { createBooking } from "@/actions/booking";
import { title } from "process";

interface BookingFormProps {
  roomId: string;
  roomTitle: string;  // Add roomTitle prop
  onNextStep: (details: {
    fullName: string;
    email: string;
    phone: string;
    payment: string;
  }) => void;
}
export default function BookingForm({ roomId,  onNextStep  }: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingProps>();

  const [bookingFor, setBookingFor] = useState<string | undefined>();
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();

  const [selectedHour, setSelectedHour] = useState<string | undefined>();
  const [selectedMinute, setSelectedMinute] = useState<string | undefined>();

  const [selectHour, setSelectHour] = useState<string | undefined>();
  const [selectMinute, setSelectMinute] = useState<string | undefined>();

  const Options = [
    { label: "Myself", value: "myself" },
    { label: "For Someone", value: "someone" },
  ];

  const PaymentOptions = [
    { label: "Mpesa", value: "mpesa" },
    { label: "Ecocash", value: "ecocash" },
  ];

  async function onSubmit(data: BookingProps) {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select both check-in and check-out dates.");
      return;
    }
  
    const bookingData: BookingProps = {
      ...data,
      roomId: roomId,
      roomTitle: title,
      checkInDate: new Date(checkInDate!),
      checkOutDate: new Date(checkOutDate!),
      paymentMethod: paymentMethod || "",
      bookingFor: bookingFor || "",
    };
  
    console.log("Booking Data being sent to API:", bookingData);
  
    setIsLoading(true);
  
    try {
      const response = await createBooking(bookingData);
      console.log("API Response:", response);
  
      if (response.status === 201) {
        toast.success("Booking created successfully!");
        reset(); 
        onNextStep({
          fullName: data.fullName,
          email: data.emails,
          phone: data.phoneNumber,
          payment: paymentMethod || "",
        });
      } else {
        toast.error(response.error || "Failed to create booking.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the booking.");
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="grid gap-4">
        <TextInput
          label="Full Name"
          register={register}
          name="fullName"
          errors={errors}
          placeholder="John Doe"
        />
        <TextInput
          label="Email Address"
          register={register}
          name="email"
          type="email"
          errors={errors}
          placeholder="johndoe03@gmail.com"
        />
        <TextInput
          label="Phone Number"
          register={register}
          name="phoneNumber"
          type="tel"
          errors={errors}
          placeholder="+266 57897856"
        />
        <DatePickerInput
          date={checkInDate}
          setDate={setCheckInDate}
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          selectedMinute={selectedMinute}
          setSelectedMinute={setSelectedMinute}
          title="Check-In Date and Time"
        />
        <DatePickerInput
          date={checkOutDate}
          setDate={setCheckOutDate}
          selectedHour={selectHour}
          setSelectedHour={setSelectHour}
          selectedMinute={selectMinute}
          setSelectedMinute={setSelectMinute}
          title="Check-Out Date and Time"
        />
        <SelectInput
          label="Booking For?"
          optionTitle="Who are you booking for?"
          options={Options}
          errors={errors}
          selectedOption={bookingFor}
          setSelectedOption={setBookingFor}
        />
        <SelectInput
          label="Payment Method?"
          optionTitle="Select method of payment"
          options={PaymentOptions}
          errors={errors}
          selectedOption={paymentMethod}
          setSelectedOption={setPaymentMethod}
        />
      </div>
      <div className="mt-8 flex justify-end gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
        <Toaster />
      </div>
    </form>
  );
}
