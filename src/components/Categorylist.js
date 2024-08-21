import React, { useEffect, useState } from "react";
import DataService from '../services/requestApi'
import { useAuth } from "../contexts/AuthConext";


const HorizontalCategoryList = () => {
  const {DataByCatogory,selectedCat} =useAuth()
 const [categories, setcategories] = useState([])
  const GetCatogroy=async ()=>{
    try {
      const response = await DataService.GetCategoryList("8")
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
