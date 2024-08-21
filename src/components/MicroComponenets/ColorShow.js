import React from "react";

const ColorShow = ({ item }) => {
  const availableColors = item.map((product, index) => {
    return product.product_color; // Changed variable name to 'product' for clarity
  });

  return (
    <>
      <h2 className="font-semibold text-lg text-dark">Available Colors:</h2>
      <div className="avatar-group  -space-x-2 rtl:space-x-reverse">
        {availableColors?.map((color, index) => {
          return (
            <div key={index} className=" rounded-full shadow-lg ">
              <div
                className={`w-4 h-4 rounded-full ml-1 ${
                  color == "White" ? "border-[2px]" : ""
                } `}
                style={{ background: `${color.toLowerCase()} ` }}
              ></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ColorShow;
