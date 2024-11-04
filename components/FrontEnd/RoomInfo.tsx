import Link from 'next/link';
import React from 'react';
import { FaTable, FaBed, FaShieldAlt, FaCar, FaWifi, FaBath, FaFire, FaMicrophone } from 'react-icons/fa';

const RoomInfo = () => {
  return (
    <div className="mt-20 flex flex-col space-y-4">
      <div className="text-black text-2xl font-semibold">
       North Valley
      </div>
      <div className="text-black text-lg font-bold">Room 01</div>
      <div className="flex items-center space-x-1">
        <span className="text-black text-lg font-normal">4.8</span>
        <div className="flex space-x-1">
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
        </div>
      </div>
      <div className="text-black text-xs font-normal">
        Golden Sands Resort is a renowned beachfront hotel and resort located on the island of Penang in Malaysia. Situated along Batu Ferringhi Beach, one of Penang&apos;s most popular tourist destinations, the resort offers guests a picturesque setting with stunning views of the Andaman Sea.<br /><br />As a luxury beach resort, Golden Sands is known for its world-class amenities and hospitality. The resort features a wide range of accommodation options, from stylish rooms to spacious suites, catering to the diverse needs of travelers. Each room is designed with modern comforts and offers scenic views of either the sea or the lush tropical gardens.
      </div>

      {/* Room Amenities Section */}
      <div className="w-full h-auto relative">
       
        
        {/* Individual Amenities with Icons */}
        <div className="flex flex-wrap justify-between mt-10">
          <div className="w-[193px] h-[193px] flex flex-col items-center bg-white rounded-lg border border-[#e8e8e8] p-4">
            <FaTable className="text-[#ff7665] text-3xl mt-8" />
            <div className="mt-5">Study Table</div>
          </div>
          <div className="w-[193px] h-[193px] flex flex-col items-center bg-white rounded-lg border border-[#e8e8e8] p-4">
            <FaBed className="text-[#ff7665] text-3xl mt-8" />
            <div className="mt-5">Double Bed</div>
          </div>
          <div className="w-[193px] h-[193px] flex flex-col items-center bg-white rounded-lg border border-[#e8e8e8] p-4">
            <FaShieldAlt className="text-[#ff7665] text-3xl mt-8" />
            <div className="mt-5">Security</div>
          </div>
          <div className="w-[193px] h-[193px] flex flex-col items-center bg-white rounded-lg border border-[#e8e8e8] p-4">
            <FaCar className="text-[#ff7665] text-3xl mt-8" />
            <div className="mt-5">Parking Area</div>
          </div>
          <div className="w-[193px] h-[193px] flex flex-col items-center bg-white rounded-lg border border-[#e8e8e8] p-4">
            <FaWifi className="text-[#ff7665] text-3xl mt-8" />
            <div className="mt-5">Free Wifi</div>
          </div>
          <div className="w-[193px] h-[193px] flex flex-col items-center bg-white rounded-lg border border-[#e8e8e8] p-4">
            <FaBath className="text-[#ff7665] text-3xl mt-8" />
            <div className="mt-5">Bathroom</div>
          </div>
          <div className="w-[193px] h-[193px] flex flex-col items-center bg-white rounded-lg border border-[#e8e8e8] p-4">
            <FaFire className="text-[#ff7665] text-3xl mt-8" />
            <div className="mt-5">Heater</div>
          </div>
          <div className="w-[193px] h-[193px] flex flex-col items-center bg-white rounded-lg border border-[#e8e8e8] p-4">
            <FaFire className="text-[#ff7665] text-3xl mt-8" />
            <div className="mt-5">Electric Blanket</div>
          </div>
          <div className="w-[193px] h-[193px] flex flex-col items-center bg-white rounded-lg border border-[#e8e8e8] p-4">
            <FaMicrophone className="text-[#ff7665] text-3xl mt-8" />
            <div className="mt-5">Microwave</div>
          </div>
        </div>
      </div>

      <button className="bg-[#ff7665] text-black py-2 px-6 rounded-[26.25px] text-lg font-semibold">
        <Link href="/book-room">
          Book Now
        </Link>
        
      </button>
    </div>
  );
}

export default RoomInfo;
