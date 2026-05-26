import { Link } from "react-router-dom";

import Header from "../../Website/Common/header";
import Footer from "../../Website/Common/footer";

export default function Admin() {

  return (

    <div className="sub_page">

      <Header />

      <div className="container layout_padding">

        <h2>Admin Panel</h2>

        <div style={{marginTop:"40px"}}>

          <Link to="/admin/add">
            <button>Add Food Item</button>
          </Link>

          <Link to="/admin/edit">
            <button style={{marginLeft:"20px"}}>
              Update Food Item
            </button>
          </Link>

          <Link to="/admin/edit">
            <button style={{marginLeft:"20px"}}>
              Delete Food Item
            </button>
          </Link>

        </div>

      </div>

      <Footer />

    </div>
  );
}