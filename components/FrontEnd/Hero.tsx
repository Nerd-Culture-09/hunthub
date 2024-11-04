'use client';

import Link from 'next/link';
import { useState } from 'react';

import SpecialOffer from './Special-Offers';
import Testimonial from './Testimonials';
import Team from './Team';
import { ImagesSliderDemo } from './Image-slider-Carousel';
import { BackGroundBoxBar } from './BackGroundBox-bar'; // Import the BackgroundBoxesDemo component
import AvailableRoomCards from './AvailableRooms';

export default function Hero() {
  return (
    <div className="bg-white">
      <div className="relative isolate pt-14 lg:pt-8 w-full overflow-hidden">
        {/* Remove any inset or margin from these divs */}
        <div className="w-full h-full">
          <ImagesSliderDemo />
        </div>
        <BackGroundBoxBar />
        <AvailableRoomCards />
        <Testimonial />
        <Team />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          
        </div>
      </div>
    </div>
  );
}