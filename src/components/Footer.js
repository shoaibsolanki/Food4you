import React from "react";
import sendIcon from ".././imgs/send-2.png";
import headphones from ".././imgs/headphone.png";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import { WhatsApp } from "@mui/icons-material";
const Footer = () => {

  const selectedStore = localStorage.getItem('selectedStore');
  const parsedStore = selectedStore ? JSON.parse(selectedStore) : null;
  const { address} = parsedStore || {};

  return (
    <>
      {/* <footer className="bg-light text-primary p-10 "> */}
        {/* <section
          id="subscribe"
          className="bg-white p-8 my-4 rounded-xl flex flex-col md:flex-row justify-evenly items-center space-y-4 md:space-y-0 md:space-x-4 max-w-[1600px] mx-auto"
        >
          <h2 className="text-3xl font-semibold capitalize text-center md:text-left">
            Subscribe FastSide
          </h2>
          <div className="bg-second flex p-4 rounded-xl w-full md:w-auto">
            <input
              className="bg-second text-white outline-none placeholder:text-white flex-1"
              placeholder="Enter Your Email"
            />
            <button className="ml-4">
              <img src={sendIcon} alt="send-your-email" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <img src={headphones} alt="Call-us-now" />
            <div>
              <a href="tel:+917755821175" className="block">
                <h3 className="text-md font-semibold">Call us 24/7</h3>
                <h3 className="text-md font-semibold">(+91) 775-582-1175</h3>
              </a>{" "}
            </div>
          </div>
        </section> */}

        {/* <div className="footer "> */}
          {/* <aside>
            <h2 className="text-4xl font-bold">FastSide</h2>
            <p className=" border-b-[1px] border-primary  pb-4 tracking-wide">
              Bhopal - kalyanitower 604 khajuri road bhopal ,462022
              <br />
              <span className="font-semibold"> Bhopal Facility: </span> Photon
              IT Ops Office: Plot No. 242/G3,
              <br />
              Nitikhand-I, Indirapuram, Ghaziabad NCR India
            </p>
            <div className="flex gap-8 my-4 text-dark ">
              <a
                href="https://www.instagram.com/fastside.in/"
                target="_blank"
                rel=" noreferrer"
              >
                <InstagramIcon className="text-pink-600" />
              </a>{" "}
              <a
                href="https://wa.me/+917755821175"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp className="text-green-500" />{" "}
              </a>{" "}
            </div>
          </aside> */}

          {/* <nav>
            <h1 className="footer-title ">About & Policy</h1>
            <Link to="/about" className="link link-hover">
              About
            </Link>{" "}
            <Link to="/returnpolicy" className="link link-hover">
              Return policy
            </Link>
            <Link to="/policy" className="link link-hover">
              Privacy policy
            </Link>
            <Link to="/shippingpolicy" className="link link-hover">
              Shipping policy
            </Link>
            <Link to="/terms-of-service" className="link link-hover">
              Terms of service
            </Link>
          </nav> */}
          {/* <nav>
            <h1 className="footer-title ">get help</h1>
            <Link to="/customercare" className="link link-hover">
              Customer care
            </Link>
          </nav> */}
        {/* </div>
      </footer> */}
      {/* lower-footer */}
      {/* <div
        id="lower-footer"
        className=" flex items-center justify-center p-4 bg-primary text-white"
      >
        THIS WEBSITE IS MANAGED BY{" "}
        <a
          target="_blank"
          href="https://photonsoftwares.com"
          className="underline text-center ml-1"
          rel="noreferrer"
        >
          {" "}
          PHOTON SOFTWARES
        </a>{" "}
      </div> */}
      <footer className="bg-background text-foreground p-6 bg-slate-300">
      <div className="text-start mb-4">
        <h1 className="text-2xl font-bold">Food4You.</h1>
        <p className="text-muted-foreground">
          {address}
        </p>
      </div>
      <div className="text-star mb-4">
        <h2 className="text-lg font-semibold">Contact</h2>
        <p className="text-muted-foreground">+91 1234567890</p>
        <p className="text-muted-foreground">info@Food4You.com</p>
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email Address"
          className="border border-border rounded-lg p-2 w-full max-w-xs mx-auto"
        />
      </div>
      <p className="text-muted-foreground mb-4">
        Join our subscribers and get best recipe delivered each week!
      </p>
      <button className="bg-dark text-white text-secondary-foreground hover:bg-secondary/80 rounded-lg p-2">
        Subscribe
      </button>
      <div className="flex justify-start space-x-4 mt-4">
        <a href="#" aria-label="Twitter">
        <InstagramIcon className="text-pink-600" />
        </a>
        {/* <a href="#" aria-label="Facebook">
          <img aria-hidden="true" alt="facebook-icon" src="https://openui.fly.dev/openui/facebook.svg?text=📘" />
        </a> */}
        <a href="#" aria-label="YouTube">
        <WhatsApp className="text-green-500" />{" "}
        </a>
      </div>
      <div className="text-center mt-4 text-muted-foreground">
        <p>© 2024 Food4You Inc. All rights Reserved</p>
      </div>
    </footer>
    </>
  );
};

export default Footer;
