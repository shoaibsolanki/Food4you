import React from "react";

const page = ({ params }) => {
  // Destructure `product` from props to access the ID
  const id = params.productid;

  console.log(id); // Log the ID for debugging

  return (
    <div className="bg-red-500 w-[100px] h-[100px]">
      {("id", id)}
      hello
    </div>
  );
};
export default page;
