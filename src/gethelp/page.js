"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import CustomerCare from "./CustomerCare";
import Faq from "./Faq";

const Page = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Box sx={{ width: "100%", typography: "body1" }}>
    //   <TabContext value={value}>
    //     <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    //       <TabList onChange={handleChange} aria-label="lab API tabs example">
    //         <Tab label="Contace Us" value="1" />
    //         <Tab label="FAQ's" value="2" />
    //       </TabList>
    //     </Box>
    //     <TabPanel value="1">
    //       <CustomerCare />
    //     </TabPanel>
    //     <TabPanel value="2">
    //       <Faq />
    //     </TabPanel>
    //   </TabContext>
    // </Box>
    <CustomerCare />
  );
};

export default Page;
