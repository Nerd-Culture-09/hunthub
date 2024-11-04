import Link from "next/link";
import { Button } from "../ui/button";

const Pricing = () => {
 
  const plans = [
    {
      name: "Basic 2 Hour Package",
      price: "100", 
      timespan :"2 hours",
      features: [
        "2 People",
        "Free Wifi",
        "Microwaave",
        "Single Bed",
        "Electric Blanket",
        "TV - easy access channels",
        "Bathroom",
        "Kettle",
      ],
      url: "/all-rooms",
    },
    {
      name: "Standard 2 Hour Package",
      price: "150",
      timespan :"2 hours",
      features: [
        "2 People",
        "Free Wifi",
        "Microwave",
        "Double Bed",
        "Electric Blanket",
        "TV - premium channels",
        "Bathroom",
        "Kettle",
      ],
      url: "/all-rooms",
    },
    {
      name: "Basic  All Night Package",
      price: "250",
      timespan :"Night",
      features: [
        "2 People",
        "Free Wifi",
        "Microwave",
        "Double Bed",
        "Electric Blanket",
        "TV - easy access channels",
        "Bathroom",
        "Kettle",
      ],
      url: "/all-rooms",
    },
    {
      name: "Standard All Night Package",
      price: "350",
      timespan :"Night",
      features: [
        "2 People",
        "Free Wifi",
        "Microwave",
        "Double Bed",
        "Electric Blanket",
        "TV- premium channels",
        "Bathroom",
        "Kettle",
      ],
      url: "/all-rooms",
    },
  ];

  return (
    <section className="py-5 mt-40">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Our Affordable Room Packages
          </h3>
          <div className="mt-3 max-w-xl">
            <p>View our packages and choose the one that suits you</p>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col p-8 rounded-xl border-2"
            >
              <div>
                <span className="text-indigo-600 font-medium">{item.name}</span>
                <div className="mt-4 text-gray-800 text-3xl font-semibold">
                  M{item.price}{" "}
                  <span className="text-xl text-gray-600 font-normal">\{item.timespan}</span>
               
                </div>
              </div>
              <ul className="py-8 space-y-3">
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {featureItem}
                  </li>
                ))}
              </ul>
              <div className="flex-1 flex items-end">
                <Button className="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700">
                  <Link href={item.url}>Start Booking</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
