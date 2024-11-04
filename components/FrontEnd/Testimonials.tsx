import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Review from "./ReviewForm";
import { getAllReviews } from "@/actions/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  fullName: string;
  occupation: string;
  message: string;
  imageUrl?: string; // New field to store the reviewer's image URL
}

export default function Testimonial() {
  const [testimonials, setTestimonials] = React.useState<Review[]>([]);

  React.useEffect(() => {
    const fetchReviews = async () => {
      const response = await getAllReviews(); // Fetch reviews from the backend
      if (response.data) {
        setTestimonials(response.data);
      }
    };
    fetchReviews();
  }, []);

  // Helper function to get initials from a name
  const getInitials = (name: string) => {
    const nameArray = name.split(" ");
    if (nameArray.length > 1) {
      return `${nameArray[0][0]}${nameArray[1][0]}`.toUpperCase();
    } else {
      return `${nameArray[0][0]}`.toUpperCase();
    }
  };

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl sm:text-center md:mx-auto">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            See what others are saying about us
          </h3>
          <p className="mt-3 text-gray-600">The Valley Guest House</p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((item, idx) => (
              <li key={idx} className="bg-gray-100 p-4 rounded-xl">
                <figure>
                  <div className="flex items-center gap-x-4">
                    <Avatar>
                      <AvatarImage
                        src={item.imageUrl || undefined}
                        alt={`${item.fullName}'s profile`}
                      />
                      <AvatarFallback>
                        {getInitials(item.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="block text-gray-800 font-semibold">
                        {item.fullName}
                      </span>
                      <span className="block text-gray-600 text-sm mt-0.5">
                        {item.occupation}
                      </span>
                    </div>
                  </div>
                  <blockquote>
                    <p className="mt-6 text-gray-700">{item.message}</p>
                  </blockquote>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        {/* Add Popover with Textarea and Button */}
        <div className="mt-8">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-full">Review</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid w-full gap-2">
                <Review />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  );
}
