"use client"

import React, { useEffect, useState } from "react";
import {
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import { getFilteredBookings } from "@/actions/booking";

export function Admin() {
  const [bookings, setBookings] = useState<any[]>([]); // Initialize state as an empty array

  useEffect(() => {
    const fetchBookings = async () => {
      const result = await getFilteredBookings();
      if (result.status === 200 && result.data) {
        setBookings(result.data); // Only set the data if it's not null
      } else {
        setBookings([]); // Handle the case where the data is null or there was an error
      }
    };

    fetchBookings();
  }, []);

  // Function to format dates as strings
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex justify-start bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Booking
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Bookings</CardTitle>
                  <CardDescription>
                    Manage your bookings and view details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Full Names</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Payment Method
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Room Title
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Room Category
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Check-In Date & Time
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                        Check-Out Date & Time
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {booking.fullName}
                          </TableCell>
                          <TableCell>{booking.phoneNumber}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {booking.paymentMethod}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {booking.room.title}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {booking.room.category}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(booking.checkInDate)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(booking.checkOutDate)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{bookings.length}</strong> bookings
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
