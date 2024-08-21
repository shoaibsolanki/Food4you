import React from "react";
import boxTick from "../../imgs/box-tick.png";
import crown from "../../imgs/crown.png";
import shield from "../../imgs/shield-security.png";


const details = [
  {
    icon: boxTick,
    title: "Free Delivery",
    details: "on order above RS 1999",
  },
  {
    icon: crown,
    title: "Best Quality",
    details: "best quality in low price",
  },
  {
    icon: shield,
    title: "1 year warranty",
    details: "Available warranty",
  },
];
const WhyUs = () => {
  return (
    <div className="w-full mx-auto bg-light rounded-xl p-4 md:p-8 flex flex-col md:flex-row flex-wrap justify-around items-center">
      {details?.map((item) => (
        <div
          className="flex flex-col md:flex-row gap-2 items-center mb-4 md:mb-0"
          key={item.index}
        >
          <div className="flex-shrink-0">
            <img src={item.icon} alt={item.title} width={50} height={50} />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-semibold text-primary">
              {item.title}
            </h2>
            <p className="text-primary text-md md:text-lg font-medium">
              {item.details}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhyUs;
