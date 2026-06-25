import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode} from "jwt-decode";

const GetUploadUrl = () => {
const uploadUrl = fetch('https://api.ocrwell.com/v1/uploads', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env['ocrw_MUvLGJfTL3FvO2X8PXmhSsR01Uj0Bn0ZUCwqRn8xCsACaEFO'],
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'filename': 'contract.pdf'
  })
})
console.log('Got ', uploadUrl)
return uploadUrl
}

const UploadFile = (uploadUrl) => {
fetch(uploadUrl, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/pdf'
  },
  body: fs.readFileSync('contract.pdf')
})
}

const Camera = () => {
const url = GetUploadUrl
UploadFile(url)    
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