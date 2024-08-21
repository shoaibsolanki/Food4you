import { useAuth } from "../contexts/AuthConext";
import AddressBox from "./Componenets/AddressBox";
import PropTypes from "prop-types";
import DataService from "../services/requestApi";
import { useEffect, useState } from "react";
const Address = ({ className = "" }) => {
  const { allOrders, authData } = useAuth();
  const { id, saasId, storeId } = authData;
  console.log(saasId, storeId);
  const [savedAddresses, setSavedAddresses] = useState();
  const getSavedData = async () => {
    try {
      const response = await DataService.GetSavedAddress(id, saasId, storeId);
      console.log("Saved addresses:", response.data.data);
      setSavedAddresses(response.data.data);
    } catch (error) {
      console.error("Error fetching saved addresses:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getSavedData();
    }
  }, [id]);
  return (
    <div
      className={`w-full flex flex-col items-start justify-start py-0  box-border gap-[19px] leading-[normal] tracking-[normal] text-left text-[20px] text-black font-caption-1 mq450:pl-5 mq450:pr-5 mq450:box-border ${className}`}
    >
      <a className="[text-decoration:none] relative leading-[32px] font-semibold text-[inherit] inline-block min-w-[81px] mq450:text-base mq450:leading-[26px]">
        Address
      </a>
      <section className="self-stretch grid grid-cols-2 max-md:grid-cols-1 items-start justify-start gap-[23px] max-w-full">
        {savedAddresses?.map((item, index) => {
          return <AddressBox key={index} address={item} />;
        })}{" "}
      </section>
    </div>
  );
};

Address.propTypes = {
  className: PropTypes.string,
};

export default Address;
