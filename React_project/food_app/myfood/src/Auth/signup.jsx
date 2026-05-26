import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup(){

  const [user,setUser] = useState({
    username:"",
    email:"",
    password:""
  });
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    await axios.post("http://localhost:5000/users",user);
    alert("Signup Successful");
    navigate("/home");  
  };

  return(

    <div style={{padding:"40px"}}>

      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br/><br/>

        <button>Signup</button>

      </form>

    </div>
  );
}