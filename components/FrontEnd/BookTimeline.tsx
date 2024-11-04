"use client";
import React from "react";

interface TimelineProps {
  currentStep: number;
}

export const Timeline: React.FC<TimelineProps> = ({ currentStep }) => {
  const steps = ["Your Selection", "Your Details", "Final Step"];
  return (
    <div className="lg:flex hidden justify-between items-center my-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex-1 text-center p-2 ${
            currentStep === index + 1 ? "font-bold text-indigo-600" : ""
          }`}
        >
          {index + 1}) {step}
          {index < steps.length - 1 && (
            <span className="mx-2"></span>
          )}
        </div>
      ))}
    </div>
  );
};
