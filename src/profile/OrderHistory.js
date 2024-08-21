import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthConext";
import Item from "./Componenets/items";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Orders = ({ className = "" }) => {
  const { allOrders, getOrderHistory ,authData} = useAuth();
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const { id, saasId, storeId, mobileNumber, name } = authData;
  const totalPages = Math.ceil(allOrders?.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = allOrders?.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    getOrderHistory(storeId,saasId,id);
    // window.location.reload();
  }, []);
  console.log(allOrders);
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Orders History</h1>
      {allOrders?.length > 0 ? (
        <>
          {" "}
          <div className="w-full flex flex-col gap-6">
            {currentOrders?.map((order, index) => (
              <section
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <div className="flex flex-col mb-4">
                  <div className="text-lg font-medium">
                    Order ID: {order.order_id}
                  </div>
                  <div className="text-sm text-gray-600">
                    Date: {order.order_date}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Status:{" "}
                    <span
                      className={`text-sm text-white font-semibold py-[4px] px-[8px] rounded-lg ${
                        order.status === "PENDING" ? "bg-red-400" : "bg-green-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  {order.order_details?.map((item, idx) => (
                    <Item
                      key={idx}
                      index={idx + 1}
                      name={item.item_name}
                      price={item.item_price}
                      quantity={item.item_qty}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
          {allOrders?.length > 3 ? (
            <div className="flex justify-between mt-4 w-full">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="py-2 px-4 bg-gray-200 rounded disabled:opacity-50"
              >
                <ArrowLeft />
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="py-2 px-4 bg-gray-200 rounded disabled:opacity-50"
              >
                <ArrowRight />
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="flex justify-center items-center text-2xl">
          No orders yet{" "}
        </div>
      )}
    </>
  );
};

Orders.propTypes = {
  className: PropTypes.string,
};

export default Orders;
