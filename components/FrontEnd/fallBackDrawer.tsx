import * as React from "react";
import { Bar, BarChart, Label, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ReservationProps } from "@/types/types";
import { DatePickerInput } from "../FormInputs/DatePickerInput";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { CheckIcon, LocateIcon, Pickaxe } from "lucide-react";
import { createReservation, getAvailRooms } from "@/actions/rooms";
import toast, { Toaster } from "react-hot-toast";
import { IconLocationPin } from "@tabler/icons-react";

export function BookDrawer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationProps>();
  const router = useRouter(); // Use the Next.js router for redirection
  const cancelRef = useRef(null); // Reference for the cancel button in AlertDialog

  // State for date, branch selection, and available rooms
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [selectHour, setSelectHour] = useState<string | undefined>();
  const [selectMinute, setSelectMinute] = useState<string | undefined>();
  const [selectedHour, setSelectedHour] = useState<string | undefined>();
  const [selectedMinute, setSelectedMinute] = useState<string | undefined>();
  const [branch, setBranch] = useState<"North" | "South" | undefined>();
  const [numberOfRooms, setNumberOfRooms] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);

  // State for controlling the AlertDialog and loader inside it
  const [isDialogLoading, setIsDialogLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch available rooms on component mount
  useEffect(() => {
    const fetchAvailableRooms = async () => {
      const result = await getAvailRooms();
      if (result.status === 200) {
        setAvailableRooms(result.data ?? []); // Fallback to an empty array if result.data is null
      }
    };

    fetchAvailableRooms();
  }, []);

  // Submit function inside the AlertDialog action
  const onSubmit = async (data: ReservationProps) => {
    if (!branch) {
      toast.error("Please select a room");
      return;
    }
    if (!checkIn || !checkOut) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }

    setIsLoading(true);
    try {
      const reservationData = {
        ...data,
        checkIn,
        checkOut,
        branch, // Now guaranteed to be either "North" or "South"
        numberOfRooms: Number(numberOfRooms),
      };

      const result = await createReservation(reservationData);

      if (result.status === 201) {
        toast.success("Reservation created successfully");
        <Toaster />;
        reset(); // Reset form after successful submission
        router.push("/");
      } else {
        toast.error(result.error || "Failed to create reservation");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex justify-center items-center">
          <Button variant="outline" className="bg-slate-900 text-white">
            Get Rental by location
          </Button>
          <Button variant="outline" className="bg-slate-900 text-white">
            <LocateIcon />
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Get Rental by location</DrawerTitle>
            <DrawerDescription>Rent your space</DrawerDescription>
          </DrawerHeader>
          <div className="flex justify-center items-center p-4 pb-0">
            <div>
              <Input placeholder="search location" />
            </div>
            <div>
              <Button variant={"outline"}>
                <IconLocationPin />
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="mt-6">
                  Search
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Reservation</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="text-neutral-900 mt-1 relative z-20">
                      Follow these steps to pay for your room:
                      <ul className="list-none mt-2">
                        <Step title="Are you paying with Mpesa or Ecocash?" />
                        <Step title="Mpesa Merchant(12345) / Ecocash Merchant(12345)" />
                        <Step title="Make Payment To Any Convinient Merchant" />
                        <Step title="Take a screenshot" />
                        <Step title="Send it here (56120463) via WhatsApp" />
                        <Step title="All Done!" />
                      </ul>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-black">{title}</p>
    </li>
  );
};
