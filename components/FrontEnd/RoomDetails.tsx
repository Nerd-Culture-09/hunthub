"use client"
import React from 'react';
import houseInfo from './houseInfo';
import { houseCarouselDemo } from './houseCarousel';


const houseDetails = () => {
    return (
        <>
            <div className="mt-20 container mx-auto px-4">
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    <div className="lg:w-1/2">
                        <houseCarouselDemo images={[]} />
                    </div>
                    <div className="lg:w-1/2 mt-8 lg:mt-0">
                        <houseInfo />
                    </div>
                </div>
            </div>
        </>
    );
}

export default houseDetails;
