import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import DataService from "../services/requestApi";
import { useAuth } from "../contexts/AuthConext";
import { Alert } from "@mui/material";
import ForgotPasswordModal from "../components/ForgetPasswordModel";

const Login = () => {
  const [error, setError] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await DataService.Login(data);
      const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
      if (response.data.status) {
        const token = response.data.data.jwt_response;
        const user = response.data.data.customer_data;

        if (token && user) {
          login(user, token);
          if (redirectUrl) {
            sessionStorage.removeItem("redirectAfterLogin");
            navigate(redirectUrl);
          } else {
            navigate("/");
          }
        } else {
          setErrorAlert(true);
          setError("User not found. Email or Password incorrect");
        }
      } else {
        setErrorAlert(true);
        setError("Invalid login credentials");
      }
    } catch (error) {
      setErrorAlert(true);
      setError("User not found. Email or Password incorrect");
    }
  };

  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center w-full"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="shadow-2xl mx-4 md:mx-10 rounded-lg bg-white h-auto md:h-[80vh] w-full sm:w-[90%] md:w-[80vh] flex flex-col justify-center items-center p-4 md:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-3 py-4 w-full"
        >
          <h1 className="font-bold text-dark text-xl">Login In</h1>
          <input
            {...register("user_name", { required: true })}
            className="border-2 bg-white rounded h-9 w-full md:w-80 focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
            type="text"
            placeholder="Phone Number"
          />
          {errors.user_name && (
            <p className="text-red-500">Phone Number is required</p>
          )}
          <input
            {...register("password", { required: true })}
            className="border-2 rounded h-9 w-full md:w-80 focus-visible:outline-none bg-white focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <input
            disabled={isSubmitting}
            className="border rounded-3xl h-9 w-full md:w-80 bg-primary text-white focus-visible:outline-none  transition-transform duration-500 cursor-pointer italic font-semibold"
            type="submit"
            value="Login"
          />
          <p>
            {/* Don't have an account?{" "} */}
            <button
              onClick={() => setIsOpen(true)}
              className="hover:text-second font-medium"
            >
              Forget Password?
            </button>
          </p>
          {errorAlert && <Alert severity="error">{error}</Alert>}
        </form>
      </div>
      <ForgotPasswordModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Login;
