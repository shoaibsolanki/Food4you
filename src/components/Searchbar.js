import React, { useEffect, useState } from "react";
// import { Modal, Button } from "react-bootstrap";
import { BASEURL } from "../services/http-Pos";
import { FavoriteRounded, Image } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useAuth } from "../contexts/AuthConext";
import axios from "axios";
// import SeachItemMOdal from "./SeachItemMOdal";
const Searchbar = () => {
  const { fetchAndSetProducts, products, setProducts } = useAuth();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const handleSearch = () => {
    try {
      if (search) {
        const apiUrl = `${BASEURL.ENDPOINT_URL}search/get-result/10001/1/${search}`;
        axios
          .get(apiUrl)
          .then((response) => {
            if (response.status === 200) {
              console.log("new Api", response);
              const data = response.data.data;
              console.log(" search", data);
              setProducts(data);
              setShow(true);
            } else {
              console.log("Failed to fetch data from the API.");
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });
      } else {
        fetchAndSetProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div className="flex items-center max-md:w-full  rounded-2xl shadow-md">
      <input
        className="bg-white rounded-l-2xl w-[300px] md:w-[400px] px-4 py-2 outline-none text-primary font-semibold"
        placeholder="Search your item here"
        // onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="bg-second text-white py-2 px-4 font-semibold rounded-r-2xl"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
