import { useAuth } from "../../contexts/AuthConext";
import { useCart } from "../../contexts/CartContext";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataService from "../../services/requestApi";
import { Add, Money, Payment } from "@mui/icons-material";
import { BASEURL } from "../../services/http-Pos";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const CheckoutPage = () => {
  const { authData, setIsPaymentSuccessful, login,isAuthenticated,name } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { id, saasId, storeId ,} = authData;

  const [billingAddress, setBillingAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedMethod, setSelectedMethod] = useState("cod");

  const handlePaymentChange = (type) => {
    setSelectedMethod(type);
    console.log(selectedMethod);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully.");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createRazorpayOrder = async () => {
    try {
      const data = {
        amount: totalPrice * 100,
        currency: "INR",
      };

      const authHeader = `Basic ${btoa(
        "rzp_test_USk6kNFvt2WXOE:afZsDDDaTvqhZPxMLH1p0b2t"
      )}`;

      const response = await axios.post(
        `${BASEURL.ENDPOINT_URL}rezar/pay/1`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      console.log("Razorpay order created:", response.data);
      return response.data.id;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      throw error;
    }
  };

  const handleRazorpayPayment = async (formData) => {
    try {
      const orderId = await createRazorpayOrder();
      const options = {
        key: "rzp_test_USk6kNFvt2WXOE",
        amount: totalPrice * 100,
        currency: "INR",
        name: "Food4You",
        description: "Test Transaction",
        image: "",
        order_id: orderId,
        handler: async function (response) {
          console.log(response);
          await handlePlaceOrder(formData, response);
          setIsPaymentSuccessful(true);
          clearCart();
          navigate("/cart/checkout/summary");
        },
        prefill: {
          name: `${formData.first_name} ${formData.last_name}`,
          email: formData.email,
          contact: formData.Mobile_numbers,
        },
        notes: {
          address: formData["Street Address"],
        },
        theme: {
          color: "#003f62",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error handling Razorpay payment:", error);
    }
  };

  const onSubmit = async (data) => {
    handleRazorpayPayment(data);
  };

  const handleSaveAddress = async (data) => {
    const addressForSave = {
      address: `${data.street},${data.city},${data.state},${data.zipcode} at ${data.address_type}`,
      address_type: data.address_type,
      street: data.street,
      store_id: storeId,
      saas_id: saasId,
      pincode: data.zipcode,
      city: data.city,
      state: data.state,
      status: "Active",
      customer_type: "Regular",
    };

    await saveAddress(addressForSave);
  };
  const [customerName,setCustomerName]= useState()
  const handlePlaceOrder = async (data, paymentResponse) => {
    try {
      const orderInformations = {
        address_id: data.address_id,
        customer_id: id,
        customer_name: name,
        mobile_number: data.Mobile_numbers,
        saas_id: saasId,
        store_id: storeId,
        order_tax: 0,
        order_value: totalPrice,
        order_discount: 0,
        status: "pending",
        payment_type: "COD",
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        order_date: new Date(),
        order_type: "",
        item_list: cart,
      };

      localStorage.setItem("orderInformations", JSON.stringify(cart));
      const response = await DataService.CreateOrder(orderInformations);

      localStorage.setItem("orderMaster", JSON.stringify(response.data));
      console.log("Order placed:", response);

      if (response.status === 200) {
        console.log("Order placed");
        document.getElementById("my_modal_5").showModal();
        clearCart();
        setIsPaymentSuccessful(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const saveAddress = async (data) => {
    try {
      const response = await DataService.SaveAddress(data, id);
      console.log("Address saved:", response);
      setShowNewAddressForm(false);
      getSavedData(); // Refresh the saved addresses list
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

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

  const handleClose = () => {
    document.getElementById("my_modal_5").close();
    navigate("/cart/checkout/summary");
  };


  // autenticationPart 

  
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const BASE_URL = 'http://103.139.59.233:8089/prod/api/v1';
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  const onSubmitFirstStep = async (data) => {
    try {
      setPhoneNumber(data.mobile_numbers);
      const response = await axios.get(`${BASE_URL}/otp/resend-otp/${data.mobile_numbers}`);
      if (response.status === 200) {
        setSnackbar({ open: true, message: 'OTP sent successfully!', severity: 'success' });

        setStep(2);
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to send OTP.', severity: 'error' });
    }
  };

  const onSubmitSecondStep = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/otp/validate-otp`, {
        mobile_no: phoneNumber,
        otp: data.otp
      });
      if (response.status === 200) {
        setSnackbar({ open: true, message: 'OTP validated successfully!', severity: 'success' });
        setStep(3);
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to validate OTP.', severity: 'error' });
    }
  };


  const onSubmitThirdStep = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/user-master/customer-sign-up`, {
        mobile_number: phoneNumber,
        password: data.password,
        customer_name: `${data.first_name} ${data.last_name}`,
        store_id: "33001",
        saas_id: "33",
      });
      if (response.status === 200) {
        setCustomerName(data.first_name,data.last_name)
      
        setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' });
        // Registration successful, handle next steps
        handleLoginSubmit(data.password);
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to register.', severity: 'error' });
    }
  };


  const handleLoginSubmit = async (password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/user-login`, { user_name: phoneNumber, password: password });
      const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
      if (response.data.status) {
        const token = response.data.data.jwt_response;
        const user = response.data.data.customer_data;
        // Handle login success, e.g., store token, navigate to dashboard, etc.
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });

        if (token && user) {
          login(user, token);
          if (redirectUrl) {
            sessionStorage.removeItem("redirectAfterLogin");
            navigate(redirectUrl);
          } 
        } 
      } else {
        // Handle login failure
      }
    } catch (error) {
      // Handle error
    }
  };
  return (
    <div className="w-full mx-auto p-4">
     {!isAuthenticated &&  <div className="border border-gray-300 p-6 mb-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
 
        {step === 1 && (
        <form onSubmit={handleSubmit(onSubmitFirstStep)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="firstName" className="text-sm font-semibold">First Name</label>
            <input
              {...register("first_name", { required: false })}
              type="text"
              id="firstName"
              placeholder="First name"
              className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.first_name && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="text-sm font-semibold">Last Name</label>
            <input
              {...register("last_name", { required: false })}
              type="text"
              id="lastName"
              placeholder="Last name"
              className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.last_name && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="text-sm font-semibold">Phone Number</label>
            <input
              {...register("mobile_numbers", { required: false })}
              type="number"
              id="phoneNumber"
              placeholder="Phone number"
              className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.mobile_numbers && <span>This field is required</span>}
          </div>
          <button type="submit"     className=" h-12 mt-5 bg-second text-white text-lg font-semibold hover:bg-yellow-600 transition-colors">Next</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmitSecondStep)} className="grid grid-cols-1 gap-4">
          <div className="form-group">
            <label htmlFor="otp" className="text-sm font-semibold">Enter OTP</label>
            <input
              {...register("otp", { required: true })}
              type="text"
              id="otp"
              placeholder="OTP"
              className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.otp && <span>This field is required</span>}
          </div>
          <button type="submit" className=" h-12 mt-5 bg-second text-white text-lg font-semibold hover:bg-yellow-600 transition-colors">Validate OTP</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmitThirdStep)} className="grid grid-cols-1 gap-4">
          <div className="form-group">
            <label htmlFor="password" className="text-sm font-semibold">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <button type="submit" className=" h-12 mt-5 bg-second text-white text-lg font-semibold hover:bg-yellow-600 transition-colors" >Register</button>
        </form>
      )}

<Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      </div>}
 

      {showNewAddressForm ? (
        <div className="border border-gray-300 p-6 mb-6 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <form className="" onSubmit={handleSubmit(handleSaveAddress)}>
            <div className="grid gap-4 grid-cols-2 max-md:grid-cols-1 w-full">
              <div className="form-group ">
                <label
                  htmlFor="streetAddress"
                  className="text-sm font-semibold"
                >
                  Street Address *
                </label>
                <input
                  {...register("street", { required: true })}
                  type="text"
                  id="streetAddress"
                  placeholder="Street Address"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.street && <span>This field is required</span>}
              </div>

              <div className="form-group">
                <label htmlFor="city" className="text-sm font-semibold">
                  Town / City *
                </label>
                <input
                  {...register("city", { required: true })}
                  type="text"
                  id="city"
                  placeholder="Town / City"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.city && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="state" className="text-sm font-semibold">
                  State
                </label>
                <input
                  {...register("state", { required: true })}
                  type="text"
                  id="state"
                  placeholder="State"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.state && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="zipCode" className="text-sm font-semibold">
                  Zip Code
                </label>
                <input
                  {...register("zipcode", { required: true })}
                  type="number"
                  id="zipCode"
                  placeholder="Zip Code"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.zipcode && <span>This field is required</span>}
              </div>
              <div className="form-group ">
                <label className="text-sm font-semibold">Address Type *</label>
                <div className="mt-2 flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      {...register("address_type", { required: true })}
                      type="radio"
                      value="Home"
                      className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="text-gray-700">Home</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      {...register("address_type", { required: true })}
                      type="radio"
                      value="Work"
                      className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="text-gray-700">Work</span>
                  </label>
                </div>
                {errors.address_type && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <span></span>
              <button
                type="submit"
                className="w-full py-3 bg-second text-white text-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Save address
              </button>
              {savedAddresses?.length !== 0 && (
                <button
                  onClick={() => setShowNewAddressForm(false)}
                  className="w-full py-3 bg-second text-white text-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Use existing address
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="border  gap-4 border-gray-300 p-6 mb-6 rounded-md">
          {savedAddresses.map((item, index) => {
            return (
              <div
                key={index}
                className="mx-auto flex flex-col md:flex-row w-full justify-between border-2 rounded-xl p-4 my-2 text-gray-700"
              >
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold mb-2">
                    <span className="font-semibold">Address:</span>{" "}
                    {item.address}
                  </h2>
                  <p className="mb-1">
                    <span className="font-semibold">Place:</span>{" "}
                    {item.addressType}
                  </p>
                  <p>
                    <span className="font-semibold">Pincode:</span>{" "}
                    {item.pincode}
                  </p>
                </div>
                <input
                  type="radio"
                  id={`address_${index}`}
                  {...register("address_id", { required: true })}
                  value={item.id.toString()}
                  checked={selectedAddress === item.id}
                  onChange={() => handleAddressSelect(item.id)}
                  className="self-start md:self-center bg-none focus:ring-2 focus:ring-blue-500 focus:outline-none h-full mt-4 md:mt-0"
                />
              </div>
            );
          })}
          <button
            className="border-2 rounded-xl p-4 mx-auto my-2 text-gray-400 flex items-center justify-center hover:bg-gray-100 w-full"
            onClick={() => setShowNewAddressForm(true)}
          >
            <Add fontSize="large" />
          </button>
        </div>
      )}
      <div className="p-4 border-[1px] rounded-md">
        <div
          onClick={() => handlePaymentChange("cod")}
          className={`mt-2 p-2 border-[2px] ${
            selectedMethod === "cod" ? "border-dark" : ""
          } rounded-md flex justify-between items-center bg-gray-100 `}
        >
          <div className="flex gap-2 text-dark">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={selectedMethod === "cod"}
              onChange={() => handlePaymentChange("cod")}
              className="mr-2"
            />
            <h3 className="font-semibold italic">COD</h3>
          </div>
          <Money className="text-black" />
        </div>
        <div
          onClick={() => handlePaymentChange("online")}
          className={`mt-2 p-2 border-[2px] ${
            selectedMethod === "online" ? "border-dark" : ""
          } rounded-md flex justify-between items-center bg-gray-100 `}
        >
          <div className="flex gap-2 text-dark">
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={selectedMethod === "online"}
              onChange={() => handlePaymentChange("online")}
              className="mr-2"
            />
            <h3 className="font-semibold italic">Pay online</h3>
          </div>
          <Payment className="text-black" />
        </div>
      </div>

      <button
        onClick={
          selectedMethod === "cod"
            ? handleSubmit(handlePlaceOrder)
            : handleSubmit(onSubmit)
        }
        className="w-full py-3 bg-second text-white rounded-md text-lg font-semibold hover:bg-yellow-600 transition-colors"
      >
        Place Order
      </button>

      <dialog id="my_modal_5" className=" modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white text-dark shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 flex-shrink-0 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="font-bold text-lg ml-4">Order Successful!</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Your order has been placed successfully. Our team will reach out to
            you shortly with the next steps.
          </p>

          <div className="modal-action">
            <a
              href="tel:+917755821175"
              className="bg-green-500 text-white p-2 rounded-lg font-semibold inline-block"
            >
              Call us!
            </a>

            <button
              className=" bg-white text-dark p-2 rounded-lg font-semibold"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CheckoutPage;
