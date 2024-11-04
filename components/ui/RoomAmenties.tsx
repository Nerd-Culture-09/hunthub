import { FaBath, FaTv, FaWifi } from 'react-icons/fa';

const RoomAmenitiesCard = () => {
  return (
    <div className=" relative max-w-sm mx-auto bg-white rounded-lg shadow-md p-6">
      
      <div className="flex items-center mb-4">
     
        <div className="ml-4 text-black text-3xl">
          Our Room Amenities
        </div>
      </div>
      <div className="flex items-center mb-4">
        <FaBath className="w-8 h-8 text-blue-500" />
        <div className="ml-4 text-black text-1xl ">
          Bathroom
        </div>
      </div>
      <div className="flex items-center mb-4">
        <FaTv className="w-8 h-8  text-blue-500" />
        <div className="ml-4 text-black text-1xl ">
          TV
        </div>
      </div>
      <div className="flex items-center mb-4">
        <FaWifi className="w-8 h-8  text-blue-500" />
        <div className="ml-4 text-black text-1xl ">
          Free Wifi
        </div>
      </div>
     
    </div>
  );
};

export default RoomAmenitiesCard;
