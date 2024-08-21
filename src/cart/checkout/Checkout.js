"use client";
import React, { useState } from "react";
import UserInformation from "./UserInformation";
import ItemsShowInSide from "./ItemsShowInSide";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthConext";

import HorizontalLinearAlternativeLabelStepper from "../../components/MicroComponenets/Stepper";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalPirce } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // if (!isAuthenticated) {
  //   return navigate("/login");
  // }
  if (cart?.lenght === 0) {
    return navigate("/");
  } else
    return (
      <div className="my-4  ">
        <HorizontalLinearAlternativeLabelStepper activeStep={1} />
        <div className="flex  justify-center max-md:flex-col-reverse ">
          <UserInformation />
          <ItemsShowInSide items={cart} />
        </div>
      </div>
    );
};

export default Checkout;
