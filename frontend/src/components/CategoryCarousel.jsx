// CategoryCarousel.jsx
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel"

function CategoryCarousel() {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack",
    "Java Developer"
  ];

  return (
    <div>
      <Carousel className="w-full max-w-5xl mx-auto my-20">
        <CarouselContent>
          {category.map((val, index) => (
            <CarouselItem key={index}>
              <button className="text-[#f83002] w-full py-4 border border-[#f83002] rounded-xl  hover:bg-[#f83002] hover:text-white transition-all duration-300 font-medium shadow-sm">
                {val}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 shadow-lg hover:bg-gray-100 flex items-center justify-center" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 shadow-lg hover:bg-gray-100 flex items-center justify-center" />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;