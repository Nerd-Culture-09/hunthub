import { getAllhouses } from "@/actions/house";
import PannelHeader from "@/components/Dashboard/PanelHeader";
import NewButton from "@/components/FormInputs/NewButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutGrid } from "lucide-react";
import React from "react"; 
import HouseUpdate from "@/components/Dashboard/RoomUpdate"; 

export default async function page() {
  const houses = await getAllhouses(); // Fetch data on the server side

  // Handle the case where houses.data might be null
  const houseData = houses?.data ?? []; // Default to an empty array if houses.data is null

  return (
    <div>
      {/* Main grid layout for the page */}
      <div className="grid grid-cols-12">
        {/* Left column for displaying house updates */}
        <div className="lg:col-span-4 col-span-full py-3 border-r border-gray-100">
          <div className="flex items-center justify-between">
            {/* Panel header for houses */}
            <PannelHeader title="houses" icon={LayoutGrid} />
            {/* New button for creating a new house (visible on small screens) */}
            <div className="lg:hidden">
              <NewButton title="New house" href="/dashboard/south/new" />
            </div>
          </div>
          {/* Scrollable area for displaying houses */}
          <div className="px-3">
            <ScrollArea className="h-[600px] w-full">
              <HouseUpdate houses={houseData} />
            </ScrollArea>
          </div>
        </div>

        {/* Right column (visible on large screens) */}
        <div className="lg:col-span-8 col-span-full hidden lg:block">
          {/* Header section with a new button for creating a new house */}
          <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
            <div className="flex items-center gap-4">
              <NewButton title="New house" href="/dashboard/south/new" />
            </div>
          </div>

          {/* Display panel for showing house statistics and options */}
          <div className="flex h-1/2 items-center justify-center py-10">
            <div className="py-4 px-6 text-center border-white shadow-md rounded-md flex flex-col items-center gap-1 text-sm">
              <LayoutGrid /> {/* Icon representing houses */}
              <div className="py-3">
                <p>Create A New house By Category.</p>
              </div>
              {/* Button for creating a new house */}
              <NewButton title="New house" href="/dashboard/south/new" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
