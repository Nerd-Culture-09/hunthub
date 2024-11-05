import React from 'react';
import { TypewriterEffectSmoothDemo } from './Typewriter';
import SouthhouseCards from './SouthhouseCards';
import NorthhouseCards from './NorthhouseCards';

function Allhouses()
{
    const house1Imgs = [
        "/valley_south_house1_bedhouse.jpeg",
        "/bedhouse_front_display.jpg",
        "/valley_south_house1_bathhouse.jpeg",
        "/valley_south_outside_night.jpeg",
        "/valley_south_town_view.jpeg",
      ];
      
      const house2Imgs = [
        "/valley_south_house2_bedhouse.jpeg",
        "/valley_south_house2_shower.jpeg",
        "/bedhouse_front_display3.jpg",
        "/valley_south_outside_night.jpeg",
        "/valley_south_town_view.jpeg",
      ];
      
      const house3Imgs = [
        "/valley_south_house3_bedhouse.jpeg",
        "/valley_south_house3_bathhouse.jpeg",
        "/bedhouse_front_display3.jpg",
        "/valley_south_outside_night.jpeg",
        "/valley_south_town_view.jpeg",
      ];
      
      const house4Imgs = [
        "/bedhouse_display2.jpeg",
        "/valley_south_house2_resthouse.jpeg",
        "/valley_south_house2_shower.jpeg",
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
            <NorthhouseCards />
            <div className="flex justify-center items-center py-10 mt-10">
              <TypewriterEffectSmoothDemo
                words={[
                  { text: "South", className:"text-gray-700" },
                  { text: "Branch", className: "text-blue-500 dark:text-red-500" },
                ]}
              />
              </div>
              <SouthhouseCards />
              </div>
    )
}

export default Allhouses;