import React from "react";

const Rating = ({ size }) => {
  return (
    <div className={`rating rating-${size} my-2`}>
      <input className="mask mask-star-2 bg-second" />
      <input className="mask mask-star-2 bg-second" />
      <input className="mask mask-star-2 bg-second" />
      <input className="mask mask-star-2 bg-second" />
      <input className="mask mask-star-2 bg-second" />
    </div>
  );
};

export default Rating;
