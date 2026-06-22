import logo from '../../assets/GananoqueFoodBank.png'
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode} from "jwt-decode";

const Home = () => {
  const navigate =useNavigate();
  const [currentUser] = useState(()=>{
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken)
    {
        return "";
    }
    try{
        const decodedToken = jwtDecode(jwtToken);
        return decodedToken.name;
    }catch{
        return "";
    }
  });
  useEffect(()=>{
    if (!currentUser)
    {
        navigate("/unauthorized");
    }
  })
  return(
    <div className="container">
      
      <h1>Home Page</h1>
      <p>Application home page, will host general information as required</p>
      <img src={logo}></img>
    </div>
  )
}

export default Home