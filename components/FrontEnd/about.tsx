import React from "react";
import FAQs from '@/components/FrontEnd/FAQs'; 
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

const About = () => {
  return (
    <section id="about" className="py-14">
      <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
          <div className="flex-1 sm:hidden lg:block mt-[1cm]">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem translateZ="50" className="w-full">
                  <img
                    src="/about.png"
                    className="w-full h-auto object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="The Valley Guest House"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
          <div className="max-w-xl px-4 space-y-3 mt-[1cm] sm:px-0 md:mt-0 lg:max-w-2xl">
            <h3 className="text-indigo-600 font-semibold mt-[2cm]">
              Welcome to The Valley Guest House
            </h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Experience Comfort and Hospitality in the Heart of Maseru
            </p>
            <p className="mt-3 text-gray-600">
              Located in Thetsane Lekhalong, Maseru, Lesotho, The Valley Guest House offers a unique and memorable stay with warm hospitality and exceptional service. Whether you&apos;re here for business or leisure, our guest house provides a comfortable retreat with all the amenities you need for a pleasant stay.
            </p>
            <p className="mt-3 text-gray-600">
              Our service area includes the beautiful surroundings of Maseru, ensuring that you have easy access to local attractions and activities. Our friendly staff is dedicated to making your stay as enjoyable and stress-free as possible.
            </p>
            <div className="mt-6 text-gray-800">
              <p className="font-semibold">Address:</p>
              <p>Thetsane Lekhalong, Maseru, Lesotho, 100</p>
              <p className="font-semibold mt-2">Service Area:</p>
              <p>Maseru, Lesotho</p>
              <p className="font-semibold mt-2">Mobile:</p>
              <p>+266 5603 8339</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <FAQs />
        </div>
      </div>
    </section>
  );
};

export default About;
