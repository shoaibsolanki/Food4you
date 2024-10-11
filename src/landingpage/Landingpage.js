import React, { useEffect, useState } from 'react'
import bgimage from '../imgs/landingbg.jpg'
import logo  from '../imgs/food4you.png'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useNavigate } from 'react-router-dom';
import DataService from '../services/requestApi';
import { useAuth } from '../contexts/AuthConext';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchableSelect from './SearchableSelect';
import { Alert, Snackbar } from '@mui/material';
const Landingpage = () => {
    const navigate = useNavigate();
    const [Address, setGetAddress] = React.useState('');
    const {setStores} = useAuth();
    const selectedStore = localStorage.getItem('selectedStore');
    const [options, setOptions] = useState([]);
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "",
    });
    const handleCloseSnackbar = () => {
      setSnackbar({ open: false, message: "", severity: "" });
    };
    const GetAddress=async ()=>{
        try {
          const response = await DataService.getAddressofStores()
          console.log(response)
          const formattedOptions = response.data.data.map(item => ({
            value: item.saas_id,   // You can change 'store_id' to any field you want as the value
            label: `${item.address}`,  // Customize label as needed
          }));
          setOptions(formattedOptions)
        } catch (error) {
          console.error(error)
        }
      }
    useEffect(()=>{
        GetAddress()
    },[])

    const GetStorebyAddress = async ()=>{
      console.log(Address)
      localStorage.setItem('deliveryAddress', Address.value)
        try {
          const response = await DataService.GetStoreByAddress(Address.value)
          console.log(response)
          if(response.data.data.length > 0){
            setStores(response.data.data)
            navigate('/stores')
          }else{
            setSnackbar({
              open: true,
              message: "Please select a Correct Address",
              severity: "error",
            });
          }
        } catch (error) {
          console.error(error)
        }
      }
      // const onChange = (e) => {
      //   setGetAddress(e.target.value)
        
      // }
      
      
      
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgimage})` }}>
    <div className="absolute inset-0  opacity-100"></div>
    <div className="relative flex flex-col items-center justify-center h-full text-white">
      {/* <img src={logo} alt="Food 4 You Logo" className="mb-8" /> */}
      <h1 className="text-3xl font-bold mb-4">Order delivery near you</h1>
      <div className="w-full max-w-md px-4">
        <div className="flex justify-between gap-2">
          {/* <div className='bg-white p-2'> */}
        {/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label" style={{
    color:"white"
  }}>Choose your Delivery Address </InputLabel>
  <Select
  sx={{
    color: 'white',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Default border color
      },
      '&:hover fieldset': {
        borderColor: 'white', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'transparent', // Remove border on focus
      },
    },
    '& .MuiSvgIcon-root': {
      color: 'white', // Dropdown icon color
    },
  }}
   
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={age}
    label="Choose your Delivery Address"
    onChange={onChange}
  >
   {deliveryAddress.length>0 && deliveryAddress?.map((item,index)=>{return(<MenuItem key={index} value={item?.address}>{item.address}</MenuItem>)}) }
    
  </Select>
</FormControl> */}
<SearchableSelect options={options} Address={Address} onChange={setGetAddress} />
          {/* </div> */}
          {/* <input
          autoComplete={false}
            list="delivery-addresses"   
            type="text"
            placeholder="Choose your Delivery Address"
            className="w-full p-2 mb-4 border text-black "
            onChange={onChange}
            // value={deliveryAddress}
          />
          <datalist id="delivery-addresses">
            {/* Delivery addresses */}
            {/* {deliveryAddress&& deliveryAddress.map((el)=>{return(<option value={el.address} />)})}
          
            {/* Add more delivery addresses */}
          {/* </datalist>   */}
          <div className="flex items-center justify-between mb-4">
            
            <button
            onClick={() => GetStorebyAddress()}
            style={{
                fontFamily:"Inter"
            }} className="px-4 py-1 bg-black text-white rounded font-bold">Find Store</button>
          </div> 
        </div>
      </div>
    </div>
    <Snackbar
            open={snackbar.open}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
  </div>
  )
}

export default Landingpage