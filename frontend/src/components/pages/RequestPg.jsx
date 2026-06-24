import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode} from "jwt-decode";
import axios from "axios";
import RequestContainer from "../pageFeatures/RequestContainer";

const RequestPg = ({PageHeader, Link}) => {
    const navigate = useNavigate();
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
    const [productRequest, setProductRequest] = useState({item: "", amount: "", recipient: ""})
    const [currentRequests, setCurrentRequests] = useState([])
    const [requestPostResponse, setRequestPostResponse] = useState("")

    useEffect(()=>{
      if (!currentUser)
      {
          navigate("/unauthorized");
      }
    })

    const handleRequestsDB = async () => {
        try {
            const response = await axios.get("http://localhost:3000/requests")
            .then(() => {console.log(response.data)})
            .then(() => {
                setCurrentRequests(() => response.data)
            })
        } catch(error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        handleRequestsDB();
    }, [requestPostResponse])

    

    const handleOnChangeProductRequest = (e) => {
        setProductRequest({...productRequest, [e.target.name]: e.target.value})
    }
    const handleOnSubmitProductRequest = async (e) => {
        e.preventDefault();
        //const newRequestList = currentRequests
        //newRequestList.push({...productRequest, requestId: currentRequests.length})
        //setCurrentRequests(newRequestList)
        try {
            await axios
                .post("http://localhost:3000/requests", productRequest)
                .then((response) => {
                    setRequestPostResponse(response.data)
                })
                .then(() => setProductRequest({item: "", amount: "", recipient: ""}))
        } catch (error) {
            console.log(error.message)
        }
        
    }
    const handleFulfillRequest = (requestId) => {
        const newRequestList = []
        currentRequests.map((request)=>(
            request.requestId != requestId && newRequestList.push({...request, requestId: newRequestList.length})
        ))
        setCurrentRequests(newRequestList)
        //let currentIterations = requestId;
        //while(currentIterations < newRequestList.length){
        //    newRequestList[currentIterations] = newRequestList[currentIterations+1]
        //    currentIterations++
        //}
    }
    
    return (
        <div>
            <PageHeader Link={Link} />
            <h1>Current Request</h1>
            {currentRequests.length > 1 && <RequestContainer requests={currentRequests} handleFulfillRequest={handleFulfillRequest} /> }
            {currentRequests.length <= 1 && <p>No Current Requests</p> }
            <br />

            <form onSubmit={handleOnSubmitProductRequest}>
                <input 
                    type="text"
                    id="item"
                    name="item"
                    placeholder="Product Name"
                    value={productRequest.item}
                    onChange={handleOnChangeProductRequest}
                />
                <input 
                    type="text"
                    id="amount"
                    name="amount"
                    placeholder="Amount"
                    value={productRequest.amount}
                    onChange={handleOnChangeProductRequest}
                />
                <input 
                    type="text"
                    id="recipient"
                    name="recipient"
                    placeholder="Product Recipient"
                    value={productRequest.recipient}
                    onChange={handleOnChangeProductRequest}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default RequestPg