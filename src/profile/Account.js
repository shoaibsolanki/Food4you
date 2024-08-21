import React from "react";
import Form from "./Componenets/Form";
import UserInfoCard from "./Componenets/UserCard";
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from "../contexts/AuthConext";
const Account = () => {
  const {
    authData
  } = useAuth();
  const { id, saasId, storeId, mobileNumber, name,email } = authData;
  const user = {
    name: name,
    email: email,
    avatarUrl: <PersonIcon style={{fontSize:"30px", color:"#003f62"}}/>, // Replace with the actual URL or remove if not needed
    bio: mobileNumber
  };
  return (
    <div>
      {/* <Form /> */}
      <UserInfoCard user={user} />
    </div>
  );
};

export default Account;
