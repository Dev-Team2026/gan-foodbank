import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode} from "jwt-decode";

const Camera = () => {
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
    <>
    <form>
        <label>Press to activate camera.</label>
 <input type="file" accept="image/*" 
        capture="camera" required 
        id="docImg">
 </input>
 </form>
    </>
)
}

export default Camera