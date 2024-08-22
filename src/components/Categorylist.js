import React, { useEffect, useState } from "react";
import DataService from '../services/requestApi'
import { useAuth } from "../contexts/AuthConext";
import { useNavigate } from "react-router-dom";


const HorizontalCategoryList = () => {
  const {DataByCatogory,selectedCat} =useAuth()
 const [categories, setcategories] = useState([])
 const selectedStore = localStorage.getItem('selectedStore');
  const parsedStore = selectedStore ? JSON.parse(selectedStore) : null;
  const { saas_id, store_id } = parsedStore || {};
  const naviagte = useNavigate();
  const GetCatogroy=async ()=>{
    try {
      if(!store_id &&!saas_id){
        naviagte("/landing");
        return
      }
      const response = await DataService.GetCategoryList(saas_id)
      console.log(response)
      setcategories(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    GetCatogroy()
  }, [])
  



  return (<>
  
        <h2 className="text-primary text-3xl font-semibold">
        Popular categories
        </h2>
    <div className="w-full mx-auto my-8 overflow-x-auto whitespace-nowrap">
      <div className="inline-flex space-x-4">
        {categories.map((category, index) => (
          <div key={index} className="inline-block text-center w-32">
            {/* <img
              className="w-24 h-24 object-cover rounded-full mx-auto"
              src={category.image}
              alt={category.name}
            /> */}
            <p className="mt-2 text-lg font-semibold cursor-pointer p-3 rounded"
            style={{
              background:selectedCat==category.category_id?'#003f62':"",
              color:selectedCat==category.category_id?'#fff':"",
            }}
            onClick={()=>{DataByCatogory(category.category_id)}}>{category.category_name}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default HorizontalCategoryList;
