import React from 'react';

const Terms = () => {
  return (
    <section id="terms" className="py-14">
      <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="text-center space-y-3">
          <h1 className="block text-gray-800 text-3xl font-semibold">
            Terms and Conditions
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto mt-[1cm]"> {/* Adjusted margin-top to 1 cm */}
            Please review the terms and conditions that govern your stay at The Valley Guest House. If you have any questions, feel free to contact us.
          </p>
        </div>
        <div className="relative bg-white rounded-md mt-10 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl sm:mx-auto" style={{ boxShadow: '0px 7px 20px 7px #F1F1F1' }}>
          <div className="px-8 py-6">
            <h2 className="text-gray-800 text-2xl font-semibold mb-4">
              1. Reservation and Payment
            </h2>
            <p className="text-gray-600 mb-4">
              All reservations require a valid credit card to secure your booking. Payment will be processed upon check-in or as specified in the booking confirmation. Cancellations or modifications to your reservation should be made in accordance with our cancellation policy.
            </p>
            <h2 className="text-gray-800 text-2xl font-semibold mb-4">
              2. Check-In and Check-Out
            </h2>
            <p className="text-gray-600 mb-4">
              Check-in is available from 2:00 PM, and check-out is by 11:00 AM. Early check-in or late check-out requests are subject to availability and may incur additional charges.
            </p>
            <h2 className="text-gray-800 text-2xl font-semibold mb-4">
              3. Cancellation Policy
            </h2>
            <p className="text-gray-600 mb-4">
              You can cancel or modify your reservation up to 24 hours before your scheduled check-in without penalty. Cancellations made less than 24 hours before check-in may be subject to a cancellation fee.
            </p>
            <h2 className="text-gray-800 text-2xl font-semibold mb-4">
              4. Privacy Policy
            </h2>
            <p className="text-gray-600 mb-4">
              We are committed to protecting your privacy. Personal information collected during your stay will be used in accordance with our privacy policy and will not be shared with third parties without your consent.
            </p>
            <h2 className="text-gray-800 text-2xl font-semibold mb-4">
              5. Liability
            </h2>
            <p className="text-gray-600 mb-4">
              The Valley Guest House is not liable for any loss or damage to personal property during your stay. We recommend securing your valuables and contacting us if you have any concerns.
            </p>
            <h2 className="text-gray-800 text-2xl font-semibold mb-4">
              6. Conduct
            </h2>
            <p className="text-gray-600">
              Guests are expected to conduct themselves in a respectful manner and adhere to house rules. The Valley Guest House reserves the right to terminate a guest’s stay if they do not comply with our policies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terms;
