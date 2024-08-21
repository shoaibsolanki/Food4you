import React, { useState } from "react";
import mainposter from ".././imgs/Mainposter.jpg";

const HeroSection = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mx-auto my-4">
      {/* {isLoading && <ImageSkeleton />} */}
      <div class="sm:w-[1300px] sm:py-16 min-w-[350px] bg-gradient-to-r from-pink-500 to-orange-300 p-6 rounded-lg shadow-lg text-center">
    <h2 class="text-2xl font-bold text-white">Up to 40% OFF</h2>
    <p class="text-white mt-2">ON YOUR FIRST ORDER</p>
    <button class="mt-4 bg-white text-pink-500 font-semibold py-2 px-4 rounded-lg hover:bg-zinc-200">ORDER NOW</button>
</div>
    </div>
  );
};

export default HeroSection;

const ImageSkeleton = () => (
  <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-xl"></div>
);
