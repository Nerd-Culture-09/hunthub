import React, { useState } from "react";
import { cn } from "@/lib/utils";
import TextInput from "../FormInputs/TextInput";
import { useForm } from "react-hook-form";
import { ReviewProps } from "@/types/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createReview } from "@/actions/users";
import SubmitButton from "../FormInputs/SubmitButton";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";

export default function Review() {
  const [isLoading, setIsLoading] = useState(false);
  const [picture, setPicture] = useState<string>(""); // Initialize as an empty string
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewProps>();
  const router = useRouter(); // useRouter hook for routing

  async function onSubmit(data: ReviewProps) {
    try {
      const user = await createReview(data);
      if (user && user.status === 200) {
        console.log("Review submitted successfully");
        reset(); // Reset form
        setIsLoading(false); // Stop loading
        toast.success("Review Sent successfully");
        router.push("/");
        console.log(user.data);
      } else {
        console.log(user.error);
      }
    } catch (error) {
      console.log(error); // Log any errors
    }
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <TextInput
              label="Full Names"
              register={register}
              name="fullName"
              errors={errors}
              placeholder={"John Doe"}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="johndoe03@gmail.com"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <TextInput
            label="Occupation"
            register={register}
            name="occupation"
            errors={errors}
            placeholder={"Software Engineer"}
          />
          <TextAreaInput
            label="Message/Review"
            register={register}
            name="message"
            errors={errors}
          />
        </LabelInputContainer>

        <SubmitButton
          title="Review"
          isLoading={isLoading}
          LoadingTitle="Sending Review, please wait...."
        />
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
