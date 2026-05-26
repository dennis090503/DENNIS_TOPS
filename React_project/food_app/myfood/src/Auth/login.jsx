import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

export default function Login(){

  const navigate = useNavigate();

  const [user,setUser] = useState({
    email:"",
    password:""
  });

  const handleChange = (e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const res = await axios.get("http://localhost:5000/users");

    const foundUser = res.data.find(
      u => u.email === user.email && u.password === user.password
    );

    if(foundUser){

        alert("Login Successful");

        navigate("/home");
    }else{

      alert("Invalid Credentials");

    }

  };

  return(

    <div style={{padding:"40px"}}>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

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

        <button>Login</button>
         <p>
            Don't have an account? 
            <Link to="/signup"> Signup</Link>
        </p>
      </form>

    </div>
  );
}