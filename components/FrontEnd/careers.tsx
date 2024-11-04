import React from 'react';

const Career = () => {
  return (
    <section id="careers" className="py-14">
      <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="text-center space-y-3">
          <h1 className="block text-gray-800 text-3xl font-semibold">
            Careers at The Valley Guest House
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto mt-4">
            Join our team and be a part of creating unforgettable experiences for our guests. We are always looking for passionate and dedicated individuals to join our team.
          </p>
        </div>
        <div className="relative bg-white rounded-md mt-10 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl sm:mx-auto" style={{ boxShadow: '0px 7px 20px 7px #F1F1F1' }}>
          <div className="px-8 py-6">
            <h2 className="text-gray-800 text-2xl font-semibold mb-4">
              Current Openings
            </h2>
            <ul className="space-y-4">
              <li className="border-b pb-4">
                <h3 className="text-gray-800 text-xl font-semibold">
                  Front Desk Manager
                </h3>
                <p className="text-gray-600 mt-2">
                  As a Front Desk Manager, you will be responsible for overseeing guest check-ins and check-outs, managing reservations, and ensuring a high level of guest satisfaction.
                </p>
                <a href="#" className="text-indigo-600 hover:underline mt-2 inline-block">Learn more</a>
              </li>
              <li className="border-b pb-4">
                <h3 className="text-gray-800 text-xl font-semibold">
                  Housekeeping Staff
                </h3>
                <p className="text-gray-600 mt-2">
                  Our Housekeeping Staff is responsible for maintaining cleanliness and orderliness in guest rooms and public areas to ensure a comfortable stay for our guests.
                </p>
                <a href="#" className="text-indigo-600 hover:underline mt-2 inline-block">Learn more</a>
              </li>
              <li>
                <h3 className="text-gray-800 text-xl font-semibold">
                  Culinary Team Member
                </h3>
                <p className="text-gray-600 mt-2">
                  Join our culinary team and help create delicious meals for our guests. Responsibilities include food preparation, kitchen organization, and ensuring food safety standards.
                </p>
                <a href="#" className="text-indigo-600 hover:underline mt-2 inline-block">Learn more</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Career;
