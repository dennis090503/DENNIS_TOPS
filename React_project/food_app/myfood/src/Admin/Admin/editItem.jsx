import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Header from "../../Website/Common/header";
import Footer from "../../Website/Common/footer";

export default function EditItem(){

  const { id } = useParams();

  const [food,setFood] = useState({
    name:"",
    price:"",
    category:"",
    image:""
  });

  const fetchItem = async()=>{
    const res = await axios.get(`http://localhost:5000/menu/${id}`);
    setFood(res.data);
  };

  useEffect(()=>{
    fetchItem();
  },[]);

  const handleChange = (e)=>{
    setFood({
      ...food,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    await axios.put(`http://localhost:5000/menu/${id}`,food);

    alert("Food Updated Successfully");
  };

  return(

    <div className="sub_page">

      <Header/>

      <div className="container layout_padding">

        <h2>Edit Food Item</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            value={food.name}
            onChange={handleChange}
          />

          <br/><br/>

          <input
            name="price"
            value={food.price}
            onChange={handleChange}
          />

          <br/><br/>

          <input
            name="category"
            value={food.category}
            onChange={handleChange}
          />

          <br/><br/>

          <input
            name="image"
            value={food.image}
            onChange={handleChange}
          />

          <br/><br/>

          <button>
            Update Food
          </button>

        </form>

      </div>

      <Footer/>

    </div>
  );
}