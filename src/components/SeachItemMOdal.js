import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { BASEURL } from "../services/http-Pos";
import { FavoriteRounded, Image } from "@mui/icons-material";
import { Rating } from "@mui/material";

function SeachItemMOdal({handleSearch,show,toggleModal,data}) {

  
  return (
    
    <Modal show={show} onHide={toggleModal}>
    <Modal.Header closeButton>
      <Modal.Title>Search Results</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {data?.map((item, index) => (
        <div
          key={index}
          className={`border-[1px] p-4 border-gray-400 rounded-xl flex ${
            "row flex-row items-center h-full w-full"
          } max-w-[400px]`}
        >
          <div className="relative w-full h-[200px]">
            <Image
              src={`${BASEURL.ENDPOINT_URL}item/get-image/${item && item.item_id}`}
              alt={item.name}
              layout="fill"
              objectFit="cover"
            />
            <button className="bg-light p-2 rounded-full absolute top-2 right-2 text-red-600">
              <FavoriteRounded fontSize="medium" />
            </button>
          </div>
          <div className="row">
            <h2 className="product-title text-primary">{item.item_name}</h2>
            <p className="priceTitle"> ${item.price}</p>
            <Rating size={"sm"} />
          </div>
        </div>
      ))}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={toggleModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default SeachItemMOdal;
