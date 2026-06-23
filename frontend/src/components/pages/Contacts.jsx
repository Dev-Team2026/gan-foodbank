import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode} from "jwt-decode";

const Contacts = ({PageHeader, Link}) => {
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
  return (
    <div className="container">
      <PageHeader Link={Link} />
      <title>Contacts</title>
      <h1>Contacts page</h1>
      <p>Page for retreiving and managing patron info</p>
    </div>
  )
}

export default Contacts