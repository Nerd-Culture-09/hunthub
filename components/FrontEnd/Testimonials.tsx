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
import Link from "next/link";

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
            Need an App or a clean Functional Website?
          </h3>
          <p className="mt-3 text-gray-600">Checkout Nucleusdevs</p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li className="bg-gray-100 p-4 rounded-xl">
              <figure>
                <div className="flex items-center gap-x-4">
                  <Avatar>
                    <AvatarImage src="/nucover.png" alt="s profile" />
                    <AvatarFallback>Nucleusdevs</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="block text-gray-800 font-semibold">
                      Nucleusdevs
                    </span>
                    <span className="block text-gray-600 text-sm mt-0.5">
                      <Link href="www.nucleusdevs.com">Nucleusdevs</Link>
                    </span>
                  </div>
                </div>
                <blockquote>
                  <p className="mt-6 text-gray-700"></p>
                </blockquote>
              </figure>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
