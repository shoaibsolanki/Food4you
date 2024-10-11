import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import { WhatsApp } from "@mui/icons-material";
import { useAuth } from "./contexts/AuthConext";
import Checkoutmodal from "./components/MicroComponenets/Checkoutmodal";

export default function RootLayout({ children }) {
  const location = useLocation();
  // const {toggle, modal} = useAuth()
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/Signup" || location.pathname === "/landing";

  return (
    <div className={isAuthPage ? "bg-white mx-auto" : "bg-white w-full"}>
      {!isAuthPage && <Navbar />}
      <main className="bg-white w-full max-w-[1600px] mx-auto px-4">
        {children}
        {/* <Checkoutmodal modal={modal} toggle={toggle}  /> */}
        <a
          href="https://wa.me/+19055198673"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-50"
        >
          <WhatsApp fontSize="large" />
        </a>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}
