import React from 'react';
import { TypewriterEffectSmoothDemo } from './Typewriter';
import SouthRoomCards from './SouthRoomCards';
import NorthRoomCards from './NorthRoomCards';

function AllRooms()
{
    const room1Imgs = [
        "/valley_south_room1_bedroom.jpeg",
        "/bedroom_front_display.jpg",
        "/valley_south_room1_bathroom.jpeg",
        "/valley_south_outside_night.jpeg",
        "/valley_south_town_view.jpeg",
      ];
      
      const room2Imgs = [
        "/valley_south_room2_bedroom.jpeg",
        "/valley_south_room2_shower.jpeg",
        "/bedroom_front_display3.jpg",
        "/valley_south_outside_night.jpeg",
        "/valley_south_town_view.jpeg",
      ];
      
      const room3Imgs = [
        "/valley_south_room3_bedroom.jpeg",
        "/valley_south_room3_bathroom.jpeg",
        "/bedroom_front_display3.jpg",
        "/valley_south_outside_night.jpeg",
        "/valley_south_town_view.jpeg",
      ];
      
      const room4Imgs = [
        "/bedroom_display2.jpeg",
        "/valley_south_room2_restroom.jpeg",
        "/valley_south_room2_shower.jpeg",
        "/valley_south_outside_night.jpeg",
        "/valley_south_town_view.jpeg",
      ];
      
      
      // Card data array
    return (
        <div className='flex flex-col p-6'>
            <div className="flex justify-center items-center py-10 mt-10">
            <TypewriterEffectSmoothDemo
              words={[
                { text: "North", className:"text-gray-700" },
                { text: "Branch", className: "text-blue-500 dark:text-red-500" },
              ]}
            />
            </div>
            <NorthRoomCards />
            <div className="flex justify-center items-center py-10 mt-10">
              <TypewriterEffectSmoothDemo
                words={[
                  { text: "South", className:"text-gray-700" },
                  { text: "Branch", className: "text-blue-500 dark:text-red-500" },
                ]}
              />
              </div>
              <SouthRoomCards />
              </div>
    )
}

export default AllRooms;