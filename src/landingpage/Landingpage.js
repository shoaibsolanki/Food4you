import React, { useEffect } from 'react'
import bgimage from '../imgs/landingbg.png'
import logo  from '../imgs/food4you.png'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useNavigate } from 'react-router-dom';
import DataService from '../services/requestApi';
import { useAuth } from '../contexts/AuthConext';
const Landingpage = () => {
    const navigate = useNavigate();
    const [deliveryAddress, setDeliveryAddress] = React.useState('');
    const [Address, setGetAddress] = React.useState('');
    const {setStores} = useAuth();
    const selectedStore = localStorage.getItem('selectedStore');
   

    const GetAddress=async ()=>{
        try {
          const response = await DataService.getAddressofStores()
          console.log(response)
          setDeliveryAddress(response.data.data)
        } catch (error) {
          console.error(error)
        }
      }
    useEffect(()=>{
        GetAddress()
    },[])

    const GetStorebyAddress = async ()=>{
        try {
          const response = await DataService.GetStoreByAddress(Address)
          console.log(response)
          setStores(response.data.data)
          navigate('/stores')
        } catch (error) {
          console.error(error)
        }
      }
      const onChange = (e) => {
        setGetAddress(e.target.value)
        localStorage.setItem('deliveryAddress', e.target.value)
      }
      
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgimage})` }}>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative flex flex-col items-center justify-center h-full text-white">
      <img src={logo} alt="Food 4 You Logo" className="mb-8" />
      <h1 className="text-3xl font-bold mb-4">Order delivery near you</h1>
      <div className="w-full max-w-md px-4">
        <div className=" shadow-md p-6">
          <input
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
            {deliveryAddress&& deliveryAddress.map((el)=>{return(<option value={el.address} />)})}
          
            {/* Add more delivery addresses */}
          </datalist>
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center px-4 py-2 bg-white text-green-500  ">
             <DeliveryDiningIcon className="mr-2 " />
              Deliver now
            </button>
            <button
            onClick={() => GetStorebyAddress()}
            style={{
                fontFamily:"Inter"
            }} className="px-4 py-2 bg-black text-white rounded font-bold">Find Store</button>
          </div> 
        </div>
      </div>
    </div>
  </div>
  )
}

export default Landingpage