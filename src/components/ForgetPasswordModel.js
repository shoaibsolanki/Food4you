import React, { useState } from "react";
import { Modal, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { BASEURL } from "../services/http-Pos"; // import {}

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showNamePassword, setshowNamePassword] = useState(false);
  const resendOtp = async () => {
    try {
      const response = await axios.get(
        `${BASEURL.ENDPOINT_URL}otp/resend-otp-forgot-password/${phoneNumber}`
      );
      console.log(response.data);
      if (response.data.status) {
        handleNextStep();
      }
      // Handle the response or update your component state here
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleVerifyClick = () => {
    resendOtp();
  };
  const [otp, setOtp] = useState("");
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  const handleVerifyOtpClick = async () => {
    try {
      const response = await axios.post(
        `${BASEURL.ENDPOINT_URL}otp/validate-otp`,
        {
          mobile_no: phoneNumber,
          otp: otp,
        }
      );

      if (response.data.status) {
        handleNextStep();
      } else {
        // Handle error or show user-friendly message
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here or show user-friendly message
      alert("An error occurred while verifying the OTP. Please try again.");
    }
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    const resetPasswordData = {
      mobile_number: phoneNumber,
      password: password,
      confirm_password: confirmPassword,
    };

    try {
      if (phoneNumber && password && confirmPassword) {
        const response = await axios.put(
          `${BASEURL.ENDPOINT_URL}user-master/forgot-password-user`,
          resetPasswordData
        );
        console.log(response.data);

        if (response.data.status) {
          alert("Password updated successfully!");
          onClose();
          setStep(1);
        } else {
          alert("Failed to update password. Please try again.");
        }
      } else {
        alert("Please fill in all the required fields.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred while resetting the password. Please try again."
      );
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Typography variant="body2" paragraph>
              Enter your email to receive an OTP.
            </Typography>
            <TextField
              label="Enter Email "
              variant="outlined"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleVerifyClick}
            >
              Next
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="body2" paragraph>
              Enter the OTP sent to your mobile number.
            </Typography>
            <TextField
              label="OTP"
              variant="outlined"
              fullWidth
              margin="normal"
              value={otp}
              onChange={handleOtpChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleVerifyOtpClick}
            >
              Next
            </Button>
            <Button variant="outlined" fullWidth onClick={handleBackStep}>
              Back
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="body2" paragraph>
              Set a new password.
            </Typography>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
            <Button variant="outlined" fullWidth onClick={handleBackStep}>
              Back
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Paper
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Forgot Password - Step {step}
        </Typography>
        {renderStepContent()}
      </Paper>
    </Modal>
  );
};

export default ForgotPasswordModal;
