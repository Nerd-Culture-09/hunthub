import React from 'react';
import { TypewriterEffectSmoothDemo } from './Typewriter';
import SouthhouseCards from './SouthRoomCards';
import NorthhouseCards from './NorthRoomCards';

export default function Allhouses()
{   
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