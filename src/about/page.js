"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import AboutUs from "./AboutUs";
import DeliveryAndShippingPolicy from "./DeliveryAndShippingPolicy";
import Policy from "./Policy";
import CancellationReturnPolicy from "./CancellationReturnPolicy";

const Page = () => {
  return <AboutUs />;
};
export default Page;
