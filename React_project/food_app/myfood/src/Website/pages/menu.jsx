import Header from "../Common/header";
import Footer from "../Common/footer";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Menu() {

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/menu");
      setMenuItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const addToCart = (item)=>{

  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  existingCart.push(item);

  localStorage.setItem("cart", JSON.stringify(existingCart));

  alert("Item added to cart");

};
  return (
    <div className="sub_page">

       <div className="hero_area">
    <div className="bg-box">
      <img src="/images/hero-bg.jpg" alt="" />
    </div>

    <Header />
  </div>

      <section className="food_section layout_padding">
        <div className="container">

          <div className="heading_container heading_center">
            <h2>Our Menu</h2>
          </div>

          <div className="row grid">

            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`col-sm-6 col-lg-4 all ${item.category}`}
              >
                <div className="box">
                  <div>
                    <div className="img-box">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="detail-box">
                      <h5>{item.name}</h5>

                      <p>{item.description}</p>

                      <div className="options">
                        <h6>${item.price}</h6>
                        <button onClick={()=>addToCart(item)}>
                        🛒
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}