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
import { getFilteredReservations } from "@/actions/booking";

export function AdminReservation() {
  const [reservations, setReservations] = useState<any[]>([]); // Initialize state as an empty array

  useEffect(() => {
    const fetchReservations = async () => {
      const result = await getFilteredReservations();
      if (result.status === 200 && result.data) {
        setReservations(result.data); // Only set the data if it's not null
      } else {
        setReservations([]); // Handle the case where the data is null or there was an error
      }
    };

    fetchReservations();
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
                    Add Reservation
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Reservations</CardTitle>
                  <CardDescription>
                    Manage your reservations below.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Full Names</TableHead>
                        <TableHead>Number Of People</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Room
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
                      {reservations.map((reservation, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {reservation.fullName}
                          </TableCell>
                          <TableCell>{reservation.numberOfRooms}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {reservation.branch}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(reservation.checkIn)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(reservation.checkOut)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{reservations.length}</strong> reservations
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
