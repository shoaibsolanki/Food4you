import React, { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="container text-primary mx-auto bg-white rounded-lg shadow-md p-6 md:p-12 my-10 ">
      <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to Fastside Badge Reel, where innovation meets functionality.
        Our mission is to provide high-quality, reliable badge reels that keep
        your essentials secure and accessible, whether you're in a fast-paced
        work environment or simply managing everyday tasks.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
      <p className="text-lg mb-4">
        Born from a passion for practical design and everyday convenience,
        Fastside Badge Reel was created to offer a solution that combines
        durability, style, and efficiency. We understand the importance of
        having your ID, keys, and small tools within easy reach, and our
        products are crafted to meet these needs with excellence.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Why Choose Fastside?</h2>
      <ul className=" list-inside text-lg mb-4 list-none">
        <li className="mb-2">
          <strong>Premium Quality:</strong> Our badge reels are made from
          top-notch materials, ensuring long-lasting performance.
        </li>
        <li className="mb-2">
          <strong>Innovative Design:</strong> Each product is thoughtfully
          designed to be both stylish and functional.
        </li>
        <li className="mb-2">
          <strong>Customer-Centric:</strong> Your satisfaction is our priority.
          We are dedicated to providing exceptional customer service and
          support.
        </li>
        <li className="mb-2">
          <strong>Versatility:</strong> Our badge reels are perfect for
          professionals in various fields, including healthcare, education,
          corporate, and more.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Our Promise</h2>
      <p className="text-lg mb-4">
        At Fastside Badge Reel, we are committed to delivering products that not
        only meet but exceed your expectations. Join the Fastside community and
        experience the perfect blend of practicality and design.
      </p>
    </main>
  );
};

export default AboutUs;
