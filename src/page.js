
import Navbar from "./components/Navbar";
import SimpleProductComponent from "./components/SimpleProductComponent";
import ProductComponent from "./components/ProductComponent";
import SaleComponenet from "./components/SaleComponenet";
import PopularProducts from "./components/PopularProducts";
import HeroSection from "./components/HeroSection";
import WhyUs from "./components/MicroComponenets/WhyUs";
import Testomonials from "./components/Testomonials";
import { useEffect, useState } from "react";
import { BASEURL } from "./services/http-Pos";
import axios from "axios";
import { useAuth } from "./contexts/AuthConext";
import ImageSwitchProduct from "./components/ImageSwitchProduct";
import HorizontalCategoryList from "./components/Categorylist";
export default function Home() {
  const { products } = useAuth();

  return (
    <main className=" min-h-screen ">
      <div className="  max-w-[1800px] mx-auto px-4 my-2">
        <HeroSection data={products} />
        <HorizontalCategoryList/>
        <PopularProducts />
        {/* <SaleComponenet /> */}
        {/* <ImageSwitchProduct /> */}
        {/* <WhyUs /> */}
      </div>
        
    </main>
  );
}
