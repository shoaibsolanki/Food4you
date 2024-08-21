import React, { useState } from "react";
import BadgeReels from ".././imgs/coverPosterImage.jpg";

const SaleComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative border-primary border-[1px] p-2 my-4 w-full md:w-auto rounded-xl">
      {isLoading && <ImageSkeleton />}
      <img
        className={`rounded-xl ${isLoading ? "hidden" : "block"}`}
        src={BadgeReels}
        onLoad={handleImageLoad}
        alt=""
      />
    </div>
  );
};

export default SaleComponent;
const ImageSkeleton = () => (
  <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-xl"></div>
);
