
import React from "react";
import client1 from ".././imgs/alx2.jpg";
import client2 from ".././imgs/anna.jpg";
import client3 from ".././imgs/anna.jpg";

const Testomonials = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 justify-around items-center">
        <div className="testimonial-card">
          <div className="flex items-center gap-4 mb-4">
            <img
              className="w-20 h-20 rounded-full border-4 border-second"
              src={client1}
              alt="client-1"
            />
            <h2 className="text-xl font-semibold text-primary">
              Savannah Nguyen
            </h2>
          </div>
          <div className="bg-light rounded-xl text-sm font-medium p-4 text-black">
            Lorem ipsum dolor sit amet consectetur. Nec sit enim tellus faucibus
            bibendum ullamcorper. Phasellus tristique aenean at lorem sed
            scelerisque.
          </div>
        </div>
        <div className="testimonial-card">
          <div className="flex items-center gap-4 mb-4">
            <img
              className="w-20 h-20 rounded-full border-4 border-yellow-400"
              src={client2}
              alt="client-2"
            />
            <h2 className="text-xl font-semibold text-primary">
              Esther Howard
            </h2>
          </div>
          <div className="bg-light rounded-xl text-sm font-medium p-4 text-black">
            Lorem ipsum dolor sit amet consectetur. Nec sit enim tellus faucibus
            bibendum ullamcorper. Phasellus tristique aenean at lorem sed
            scelerisque.
          </div>
        </div>
        <div className="testimonial-card">
          <div className="flex items-center gap-4 mb-4">
            <img
              className="w-20 h-20 rounded-full border-4 border-yellow-400"
              src={client3}
              alt="client-3"
            />
            <h2 className="text-xl font-semibold text-primary">
              Esther Howard
            </h2>
          </div>
          <div className="bg-light rounded-xl text-sm font-medium p-4 text-black">
            Lorem ipsum dolor sit amet consectetur. Nec sit enim tellus faucibus
            bibendum ullamcorper. Phasellus tristique aenean at lorem sed
            scelerisque.
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="w-3 h-3 bg-yellow-500 rounded-full mx-1"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full mx-1"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full mx-1"></div>
      </div>
    </section>
  );
};

export default Testomonials;
