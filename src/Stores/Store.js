import React, { useEffect } from 'react'
import RestaurantCard from './RestaurantCard'
import { useAuth } from '../contexts/AuthConext';
import { useNavigate } from 'react-router-dom';
import DataService from '../services/requestApi';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const Store = () => {
    const {stores ,setStores ,fetchAndSetProducts} = useAuth();
    const [cuisine, setCuisine] = React.useState([])
    const navigate = useNavigate();
    const address = localStorage.getItem('deliveryAddress');
    const onClick=async(Store)=>{
       await localStorage.setItem('selectedStore', JSON.stringify(Store))
        fetchAndSetProducts();
        navigate('/')
    }
   const getStores =async () => {
    try {
      const response = await DataService.GetStoreByAddress(address);
      setStores(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(()=>{
    getStores()
  },[])


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const getCuisine=async () => {
    try {
      const response = await DataService.GetCuisne();
      console.log(response)
      setCuisine(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    getCuisine()
  },[])

  const getStoresByCuisine=async (cuisine_id) => {
    try {
      const response = await DataService.GetStoreByCuisine(address,cuisine_id);
      setStores(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
    <div className="flex items-center space-x-4 my-2">
    <div className="p-2 bg-blue-900 text-white rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-12 7.5h7.5m-10.5 7.5h13.5"
          />
        </svg>
      </div>
      {/* //add drop down menu  */}
      <Button
      style={{
        borderRadius: '5px',
        padding: '8px 10px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#fff',
        textTransform: 'uppercase',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        backgroundColor: 'gray',
        transition: 'all 0.3s ease-in-out'
      }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Cusine
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {cuisine && cuisine?.map((item)=>{return(<MenuItem onClick={()=>{getStoresByCuisine(item)}}>{item}</MenuItem>)}) 
        }
      </Menu>
    </div>
    {stores.length >0? <div className='w-full mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {stores && stores?.map((el)=>{return(<RestaurantCard store={el} onClick={onClick}   name={el.store_name} address={el.address} cuisines={el.cuisines}/>)})}
    </div>: <div className='text-center text-lg font-medium bg-[#003f62] text-white'>No stores found.</div>}
    </>
  )
}

export default Store