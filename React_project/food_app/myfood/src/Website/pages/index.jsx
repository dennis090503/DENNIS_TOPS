// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from '../Common/header';
import Footer from '../Common/footer';
import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function Main(){
      const [filter, setFilter] = useState("all");
      const [menuItems, setMenuItems] = useState([]);
 useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then(res => res.json())
      .then(data => setMenuItems(data));
  }, []);
  const filteredItems =
    filter === "all"
      ? menuItems
      : menuItems.filter(item => item.category === filter);
    return (
  <div>
   
  <div className="hero_area">

    <div className="bg-box">
      <img src="/images/hero-bg.jpg" alt="" />
    </div>

    <Header />
  <section className="slider_section">
  <div
    id="customCarousel1"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    <div className="carousel-inner">

      {/* Slide 1 */}
      <div className="carousel-item active">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-lg-6">
              <div className="detail-box">
                <h1>Fast Food Restaurant</h1>
                <p>
                  Doloremque, itaque aperiam facilis rerum, commodi,
                  temporibus sapiente ad mollitia laborum quam quisquam
                  esse error unde.
                </p>
                <div className="btn-box">
                  <a href="#" className="btn1">
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="carousel-item">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-lg-6">
              <div className="detail-box">
                <h1>Fast Food Restaurant</h1>
                <p>
                  Doloremque, itaque aperiam facilis rerum, commodi,
                  temporibus sapiente ad mollitia laborum quam quisquam
                  esse error unde.
                </p>
                <div className="btn-box">
                  <a href="#" className="btn1">
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="carousel-item">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-lg-6">
              <div className="detail-box">
                <h1>Fast Food Restaurant</h1>
                <p>
                  Doloremque, itaque aperiam facilis rerum, commodi,
                  temporibus sapiente ad mollitia laborum quam quisquam
                  esse error unde.
                </p>
                <div className="btn-box">
                  <a href="#" className="btn1">
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    {/* Indicators */}
    <div className="container">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#customCarousel1"
          data-bs-slide-to="0"
          className="active"
        ></button>
        <button
          type="button"
          data-bs-target="#customCarousel1"
          data-bs-slide-to="1"
        ></button>
        <button
          type="button"
          data-bs-target="#customCarousel1"
          data-bs-slide-to="2"
        ></button>
      </div>
    </div>

  </div>
</section>
</div>
  <section className="offer_section layout_padding-bottom">
    <div className="offer_container">
      <div className="container ">
        <div className="row">
          <div className="col-md-6  ">
            <div className="box ">
              <div className="img-box">
                <img src="images/o1.jpg" alt />
              </div>
              <div className="detail-box">
                <h5>
                  Tasty Thursdays
                </h5>
                <h6>
                  <span>20%</span> Off
                </h6>
                <a href>
                  Order Now <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 456.029 456.029" style={{enableBackground: 'new 0 0 456.029 456.029'}} xmlSpace="preserve">
                    <g>
                      <g>
                        <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
               c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
               C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
               c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
               C457.728,97.71,450.56,86.958,439.296,84.91z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
               c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z" />
                      </g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6  ">
            <div className="box ">
              <div className="img-box">
                <img src="images/o2.jpg" alt />
              </div>
              <div className="detail-box">
                <h5>
                  Pizza Days
                </h5>
                <h6>
                  <span>15%</span> Off
                </h6>
                <a href>
                  Order Now <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 456.029 456.029" style={{enableBackground: 'new 0 0 456.029 456.029'}} xmlSpace="preserve">
                    <g>
                      <g>
                        <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
               c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
               C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
               c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
               C457.728,97.71,450.56,86.958,439.296,84.91z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
               c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z" />
                      </g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="food_section layout_padding-bottom">
      <div className="container">

        <div className="heading_container heading_center">
          <h2>Our Menu</h2>
        </div>

        {/* Filter Buttons */}
        <ul className="filters_menu">
          <li
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </li>

          <li
            className={filter === "burger" ? "active" : ""}
            onClick={() => setFilter("burger")}
          >
            Burger
          </li>

          <li
            className={filter === "pizza" ? "active" : ""}
            onClick={() => setFilter("pizza")}
          >
            Pizza
          </li>

          <li
            className={filter === "pasta" ? "active" : ""}
            onClick={() => setFilter("pasta")}
          >
            Pasta
          </li>

          <li
            className={filter === "fries" ? "active" : ""}
            onClick={() => setFilter("fries")}
          >
            Fries
          </li>
        </ul>

        {/* Food Items */}
        <div className="row">
          {filteredItems.map(item => (
            <div key={item.id} className="col-sm-6 col-lg-4">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="detail-box">
                    <h5>{item.name}</h5>

                    <p>
                      Veniam debitis quaerat officiis quasi cupiditate quo,
                      quisquam velit, magnam voluptatem repellendus sed eaque.
                    </p>

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

        <div className="btn-box">
          <a href="#">View More</a>
        </div>

      </div>
    </section>
  {/* end food section */}
  {/* about section */}
  <section className="about_section layout_padding">
    <div className="container  ">
      <div className="row">
        <div className="col-md-6 ">
          <div className="img-box">
            <img src="images/about-img.png" alt />
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-box">
            <div className="heading_container">
              <h2>
                We Are Feane
              </h2>
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour, or randomised words which don't look even slightly believable. If you
              are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
              the middle of text. All
            </p>
            <a href>
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* end about section */}
  {/* book section */}
  <section className="book_section layout_padding">
    <div className="container">
      <div className="heading_container">
        <h2>
          Book A Table
        </h2>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form_container">
            <form action>
              <div>
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div>
                <input type="text" className="form-control" placeholder="Phone Number" />
              </div>
              <div>
                <input type="email" className="form-control" placeholder="Your Email" />
              </div>
              <div>
                <select className="form-control nice-select wide">
                  <option value disabled selected>
                    How many persons?
                  </option>
                  <option value>
                    2
                  </option>
                  <option value>
                    3
                  </option>
                  <option value>
                    4
                  </option>
                  <option value>
                    5
                  </option>
                </select>
              </div>
              <div>
                <input type="date" className="form-control" />
              </div>
              <div className="btn_box">
                <button>
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
       <div className="col-md-6">
        <div className="map_container">
            <iframe
            title="google-map"
            src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            loading="lazy"
            ></iframe>
        </div>
        </div>
      </div>
    </div>
  </section>
  {/* end book section */}
  {/* client section */}
<section className="client_section layout_padding-bottom">
  <div className="container">
    <div className="heading_container heading_center psudo_white_primary mb_5">
      <h2>What Says Our Customers</h2>
    </div>

    <div
      id="clientCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">

        {/* Slide 1 */}
        <div className="carousel-item active">
          <div className="row">

            {/* Client 1 */}
            <div className="col-md-6">
              <div className="box text-white p-4 rounded bg-dark">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <h6 className="mt-3">Moana Michell</h6>
                <p>magna aliqua</p>
              </div>

              <div className="text-center mt-3">
                <img
                  src="/images/client1.jpg"
                  alt=""
                  className="rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "6px solid #fcbf49"
                  }}
                />
              </div>
            </div>

            {/* Client 2 */}
            <div className="col-md-6">
              <div className="box text-white p-4 rounded bg-dark">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <h6 className="mt-3">Mike Hamell</h6>
                <p>magna aliqua</p>
              </div>

              <div className="text-center mt-3">
                <img
                  src="/images/client2.jpg"
                  alt=""
                  className="rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "6px solid #fcbf49"
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Slide 2 (duplicate for demo) */}
        <div className="carousel-item">
          <div className="row">

            <div className="col-md-6">
              <div className="box text-white p-4 rounded bg-dark">
                <p>
                  Amazing service and delicious food. Highly recommended!
                </p>
                <h6 className="mt-3">Sarah Lee</h6>
                <p>Customer</p>
              </div>

              <div className="text-center mt-3">
                <img
                  src="/images/client1.jpg"
                  alt=""
                  className="rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "6px solid #fcbf49"
                  }}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="box text-white p-4 rounded bg-dark">
                <p>
                  The best burgers in town. Will definitely come back again!
                </p>
                <h6 className="mt-3">John Carter</h6>
                <p>Customer</p>
              </div>

              <div className="text-center mt-3">
                <img
                  src="/images/client2.jpg"
                  alt=""
                  className="rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "6px solid #fcbf49"
                  }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Navigation Arrows */}
      <div className="text-center mt-5">
        <button
          className="btn rounded-circle me-3"
          style={{ backgroundColor: "#fcbf49", width: "50px", height: "50px" }}
          data-bs-target="#clientCarousel"
          data-bs-slide="prev"
        >
          ‹
        </button>

        <button
          className="btn rounded-circle"
          style={{ backgroundColor: "#fcbf49", width: "50px", height: "50px" }}
          data-bs-target="#clientCarousel"
          data-bs-slide="next"
        >
          ›
        </button>
      </div>

    </div>
  </div>
</section>


  <Footer></Footer>
</div>

    )
}