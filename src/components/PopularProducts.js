"use client";
import React, { useEffect, useState } from "react";
import ProductComponent from "./ProductComponent";
import { BASEURL } from "../services/http-Pos";
import axios from "axios";
import DataService from "../services/requestApi";
import { useAuth } from "../contexts/AuthConext";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const PopularProducts = ({ data, setData }) => {
  const { products ,fetchAndSetProducts,hasMore} = useAuth();
  console.log("All Product",products)
  // const [currentPage, setCurrentPage] = useState("1");

  // const GetAllBillingItem = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${BASEURL.ENDPOINT_URL}search/recommended-item/10001/1/1`
  //     );
  //     setData(response.data.data); // Update the seeds state with the fetched data
  //   } catch (error) {
  //     console.error("Error fetching billing items:", error);
  //   }
  // };

  // useEffect(() => {
  //   GetAllBillingItem();
  // }, [currentPage]);

  // const CatgorybyData = async (query) => {
  //   try {
  //     const response = await DataService.GetDataByCatorya(
  //       "33",
  //       "33001",
  //       query,
  //       currentPage
  //     );
  //     console.log(response);
  //     setData(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const [allcategory, setAllCategory] = useState([]);

  // const GetAllCategory = async () => {
  //   try {
  //     const response = await DataService.GetAllCateogary("33", "33001");

  //     if (response && response.data && response.data.data) {
  //       setAllCategory(response.data.data);
  //       if (response.data.data.length > 0) {
  //         // CatgorybyData(response.data.data[0].category_name);
  //       }
  //     } else {
  //       console.error("Unexpected response structure:", response);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  // useEffect(() => {
  //   if(products?.length==0 ){
  //     fetchAndSetProducts();
  //   }
  // }, []);

  return (
    <div id="popular-products" className="my-2 mx-auto max-w-[1600px]">
      <div className="flex justify-between items-center px-4 md:px-0">
        <h2 className="text-primary text-3xl font-semibold">
        Today’s Special
        </h2>
        {/* <ul className="flex flex-wrap justify-between gap-4">
          {allcategory.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                // setActiveButton(index);
                CatgorybyData(item.category_name);
              }}
              className="px-8 py-3 border-[1px] cursor-pointer border-primary rounded-3xl text-primary text-lg font-medium capitalize hover:bg-light"
            >
              {item.category_name}
            </li>
          ))}

          {/* <li className="px-8 py-3 border-[1px] cursor-pointer border-primary rounded-3xl text-primary text-lg font-medium capitalize hover:bg-light">
            Lanyards{" "}
          </li>
        </ul> */}
      </div>
      <InfiniteScroll
      dataLength={products.length} // This is the length of the data so far
      next={fetchAndSetProducts} // Function to fetch more data
      hasMore={hasMore} // Flag to show if more data is available
      loader={<h4 className="text-center bg-[#003f62] text-white">Loading...</h4>} // Loader component
      endMessage={<p className="text-center bg-[#003f62] text-white">No more products available</p>} // Message when no more data is available
    >
      <div className="w-full mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products
          .map((item, index) => (
            <div key={index} className="inline-block">
              <ProductComponent data={item}  />
            </div>
            
          ))}
      </div>
           </InfiniteScroll>
    </div>
  );
};

export default PopularProducts;
