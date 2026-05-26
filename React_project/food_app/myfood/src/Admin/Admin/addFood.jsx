import { useState } from "react";
import axios from "axios";

import Header from "../../Website/Common/header";
import Footer from "../../Website/Common/footer";

export default function AddFood(){

  const [food,setFood] = useState({
    name:"",
    price:"",
    category:"",
    image:""
  });

  const handleChange = (e)=>{
    setFood({
      ...food,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    await axios.post("http://localhost:5000/menu",food);

    alert("Food Added");

    setFood({
      name:"",
      price:"",
      category:"",
      image:""
    });
  };

  return(

    <div className="sub_page">

      <Header/>

      <div className="container layout_padding">

        <h2>Add Food Item</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Food Name"
            value={food.name}
            onChange={handleChange}
          />

          <br/><br/>

          <input
            name="price"
            placeholder="Price"
            value={food.price}
            onChange={handleChange}
          />

          <br/><br/>

          <input
            name="category"
            placeholder="Category"
            value={food.category}
            onChange={handleChange}
          />

          <br/><br/>

          <input
            name="image"
            placeholder="/images/f1.png"
            value={food.image}
            onChange={handleChange}
          />

          <br/><br/>

          <button>Add Food</button>

        </form>

      </div>

      <Footer/>

    </div>

  );
}