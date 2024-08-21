import { Link } from "react-router-dom";
import React, { useState } from "react";
import DataService from "../services/requestApi";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthConext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // Get the current date
  const today = new Date();

  // Extract the date part (without the time)
  const currentDate = today.toLocaleDateString();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      address_3: "Building 5",
      discount_percent: 10.0,
      saas_id: "33",
      store_id: "33001",
      sub_centre_id: 1,
      card_number: Math.ceil(Math.random() * 10000),
      city: "city",
      state: "state",
      country: "India",
      preferred_language: "English",
      customer_since: currentDate,
      payment_terms: 30,
      credit_limit: 10000.0,
      sales_representative: "Jane Smith",
      gender: "male",
      occupation: "occ",
      income_level: 50000,
      source_of_acq: "online",
      customer_type: "CUSTOMER",
    },
  });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");

  const handleToast = (message, title) => {
    setToastMessage(message);
    setToastTitle(title);
    setOpenToast(true);
  };

  const SignUp = async (data) => {
    try {
      console.log(data);
      const response = await DataService.Signup(data);
      console.log(response.data);
      if (response?.data?.status) {
        handleToast("success", "Account Created Now You can  Login");
        setSignupSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
        setTimeout(() => {
          setSignupSuccess(false);
        }, 6000);
      } else {
        handleToast("warning", "Something Went Wrong Please Try Again!");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      handleToast("success", "error");
    }
  };

  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center w-full min-md:justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {signupSuccess ? (
        <div className="shadow-2xl mx-4 md:mx-10 rounded-lg bg-lightPrimary h-auto md:h-[80vh] w-full sm:w-[90%] md:w-[80vh] flex flex-col justify-center items-center overflow-auto p-4">
          {/* <Image src={Success} width="200" height="200" alt="login success" /> */}
          <h2 className="text-2xl text-second font-semibold underline text-center px-4">
            SignUp Successful! You'll be redirected to the Login Page
          </h2>
        </div>
      ) : (
        <div className="shadow-2xl mx-4 md:mx-10 rounded-lg bg-white h-auto md:h-[80vh] w-full sm:w-[90%] md:w-[80vh] flex flex-col justify-center items-center overflow-auto p-4">
          <form
            onSubmit={handleSubmit(SignUp)}
            className="flex flex-col items-center gap-3 py-4 w-full"
          >
            <h1 className="font-bold drop-shadow-md text-xl mb-4">
              Create Account
            </h1>
            <div className="grid grid-cols-1 gap-3 w-full px-2 sm:px-6 md:grid-cols-2 max-md:max-h-[300px] overflow-y-auto">
              <input
                {...register("name")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Name"
              />
              <input
                {...register("email")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Email"
              />
              <input
                {...register("password")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="password"
                placeholder="Password"
              />
              <input
                {...register("mobile_number")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Mobile Number"
              />
              <input
                {...register("dob")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="date"
                placeholder="Date of Birth"
              />
              <input
                {...register("address_1")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Address 1"
              />
              <input
                {...register("address_2")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Address 2"
              />
              {/* <select
                {...register("gender")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select> */}
              {/* <input
                {...register("occupation")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Occupation"
              /> */}
              {/* <input
                {...register("income_level")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Income Level"
              /> */}
              {/* <input
                {...register("source_of_acq")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Source of Acquisition"
              /> */}
              {/* <input
                {...register("customer_type")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Customer Type"
              /> */}
            </div>

            <input
              disabled={isSubmitting}
              className="border rounded-3xl h-9 w-full md:w-80 bg-primary italic font-semibold  cursor-pointer text-white focus-visible:outline-none  transition-transform duration-500 mt-4"
              type="submit"
              value="Signup"
            />
            <p className="mt-4 text-center">
              Already Have Account?{" "}
              <Link className="hover:text-second font-medium" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
