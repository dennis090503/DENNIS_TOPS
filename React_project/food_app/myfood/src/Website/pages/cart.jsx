import Header from "../Common/header";
import Footer from "../Common/footer";
import { useEffect, useState } from "react";

export default function Cart(){

  const [cart,setCart] = useState([]);

  useEffect(()=>{
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  },[]);

  const total = cart.reduce((sum,item)=> sum + Number(item.price),0);

  return(

    <div className="sub_page">
                <div className="hero_area">
           <div className="bg-box">
             <img src="/images/hero-bg.jpg" alt="" />
           </div>
       
           <Header />
         </div>
      <div className="container layout_padding">

        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (

          <div>

            {cart.map((item)=>(
              <div key={item.id} style={{marginBottom:"20px"}}>

                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>

              </div>
            ))}

            <hr/>

            <h3>Total: ${total}</h3>

          </div>

        )}

      </div>

      <Footer/>

    </div>

  );
}