import { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../Website/Common/header";
import Footer from "../../Website/Common/footer";

export default function EditFood(){

  const [menuItems,setMenuItems] = useState([]);

  const fetchMenu = async()=>{
    const res = await axios.get("http://localhost:5000/menu");
    setMenuItems(res.data);
  };

  useEffect(()=>{
    fetchMenu();
  },[]);

  const deleteFood = async(id)=>{

    await axios.delete(`http://localhost:5000/menu/${id}`);

    fetchMenu();
  };

  return(

    <div className="sub_page">

      <Header/>

      <div className="container layout_padding">

        <h2>Edit / Delete Food</h2>

        <table border="1" width="100%" cellPadding="10">

          <thead>

            <tr>

              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {menuItems.map((item)=>(
              
              <tr key={item.id}>

                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>

                <td>

                <Link to={`/admin/edit/${item.id}`}>
                    <button>Edit</button>
                </Link>

                  <button
                    onClick={()=>deleteFood(item.id)}
                    style={{marginLeft:"10px"}}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <Footer/>

    </div>
  );
}