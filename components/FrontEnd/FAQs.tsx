import React from 'react';

const FAQs = () => {

    const faqsList = [
        {
            q: "What amenities are provided at The Valley Guest House?",
            a: "At The Valley Guest House, we offer a range of amenities including free Wi-Fi, comfortable bedding, a complimentary breakfast, and access to a garden area. Each room is equipped with a private bathroom and basic toiletries."
        },
        {
            q: "What is the check-in and check-out time?",
            a: "Check-in is available from 2:00 PM, and check-out is by 11:00 AM. If you need to make special arrangements, please contact us in advance."
        },
        {
            q: "Is there parking available?",
            a: "Yes, we offer free on-site parking for our guests. Please let us know if you require a parking spot when making your reservation."
        },
        {
            q: "Do you offer room service?",
            a: "Currently, we do not offer room service. However, there are several local restaurants and cafes nearby that we can recommend."
        },
        {
            q: "Are pets allowed at The Valley Guest House?",
            a: "We love pets, but unfortunately, we do not allow pets on the property to ensure the comfort of all our guests."
        },
        {
            q: "Can I cancel or modify my reservation?",
            a: "Yes, you can cancel or modify your reservation. Please refer to our cancellation policy on our website or contact us directly for more information."
        }
    ];

    return (
        <div className="leading-relaxed mt-12 mx-4 md:mx-8">
            <div className="text-center space-y-3">
                <h1 className="block text-gray-800 text-3xl font-semibold">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-500 max-w-lg mx-auto">
                    Find answers to some of the most common questions about The Valley Guest House. If you have any other questions, feel free to contact us.
                </p>
            </div>
            <div className="relative bg-white rounded-md mt-10 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl sm:mx-auto" style={{ boxShadow: '0px 7px 20px 7px #F1F1F1' }}>
                <div className="grid gap-4 py-8 md:grid-cols-2">
                    {faqsList.map((item, idx) => (
                        <div className="space-y-3 mt-6 px-8" key={idx}>
                            <h4 className="text-gray-800 text-xl font-semibold">
                                {item.q}
                            </h4>
                            <p className="text-gray-500">
                                {item.a}
                            </p>
                        </div>
                    ))}
                </div>
                <span className="w-0.5 h-full bg-gray-200 m-auto absolute top-0 left-0 right-0 hidden md:block"></span>
            </div>
        </div>
    );
}

export default FAQs;
