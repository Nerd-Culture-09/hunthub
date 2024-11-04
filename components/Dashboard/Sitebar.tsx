"use client"

import { Activity, BookOpenCheck, Home, Hotel, House, Power, Ship } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Sidebar links for ADMIN
  const sideBarLinks = [
    {title:"Home", path:"/", icon: House},
    {title:"Bookings", path:"/dashboard", icon: BookOpenCheck},
    {title:"Reservations", path:"/dashboard/reserve", icon: Activity},
    {title:"Rooms", path:"/dashboard/south", icon: Hotel},
  ];

  // Function to handle logout
  async function handlelogOut() {
    await signOut(); // Sign out the user
    router.push("/login"); // Redirect to login page
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Header section with logo and notifications button */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Ship className="text-blue-600 h-5 w-5" />
            <span className="">The Valley</span>
          </Link>
        </div>

        {/* Main navigation section */}
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {/* Map through sidebar links and render each */}
            {sideBarLinks.map((item, i) => {
              const Icon = item.icon; // Icon component
              return (
                <Link
                  key={i}
                  href={item.path}
                  className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.path ? "bg-muted text-primary" : "" 
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout button section */}
        <div className="mt-auto p-4">
          <Button onClick={handlelogOut} size="sm">
            <Power className="h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
