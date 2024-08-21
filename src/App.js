import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Page from "./login/page"; // Adjust path as necessary
import { AuthProvider } from "./contexts/AuthConext";
import { CartProvider } from "./contexts/CartContext";
import "./globals.css";
import Signup from "./Signup/page";
import RootLayout from "./layout";
import Home from "./page";
import ProductDetails from "./[productid]/page";
import Profile from "./profile/page";
import Cart from "./cart/page";
import Checkout from "./cart/checkout/Checkout";
import AboutUs from "./about/AboutUs";
import Login from "./login/page";
import OrderComplete from "./cart/checkout/summary/page";
import CancellationReturnPolicy from "./returnpolicy/page";
import Policy from "./about/Policy";
import DeliveryAndShippingPolicy from "./about/DeliveryAndShippingPolicy";
import TermandCondition from "./about/TermandCondition";
import CustomerCare from "./gethelp/CustomerCare";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route path="/cart/checkout/summary" element={<OrderComplete />} />

            <Route
              path="/ProductDetails/:item_id"
              element={<ProductDetails />}
            />

            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/returnpolicy"
              element={<CancellationReturnPolicy />}
            />
            <Route path="/policy" element={<Policy />} />
            <Route
              path="/shippingpolicy"
              element={<DeliveryAndShippingPolicy />}
            />
            <Route path="/terms-of-service" element={<TermandCondition />} />

            <Route path="/customercare" element={<CustomerCare />} />
          </Routes>
        </RootLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
