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
    const [filters, setFilters] = useState({itemFilter: "", amountFilter: "", amountFilterType: "", recipientFilter: ""})

    useEffect(()=>{
      if (!currentUser)
      {
          navigate("/unauthorized");
      }
    })

    const handleRequestsDB = async () => {
        try {
            await axios.get("http://localhost:3000/requests")
            //.then((response) => {console.log(response.data)})
            .then((response) => {
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
                    //console.log("test2")
                    setRequestPostResponse(response.data)
                })
                .then(() => setProductRequest({item: "", amount: "", recipient: ""}))
        } catch (error) {
            console.log(error.message)
        }
        
    }
    const handleFulfillRequest = async (requestId) => {
        try {
            await axios
                .delete(`http://localhost:3000/requests/${requestId}`)
                .then((response) => {
                    //console.log("test2")
                    setRequestPostResponse(response.data)
                })
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleOnChangeFilters = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value})
    }
    const handleOnSubmitFilters = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post("http://localhost:3000/filterRequests", filters)
                .then((response) => {
                    //console.log("test2")
                    setRequestPostResponse(response.data)
                })
        } catch (error) {
            console.log(error.message)
        }
    }
    
    return (
        <div>
            <PageHeader Link={Link} />

            <form onSubmit={handleOnSubmitFilters}>
                <input 
                    type="text"
                    id="itemFilter"
                    name="itemFilter"
                    placeholder="Product Name"
                    value={filters.itemFilter}
                    onChange={handleOnChangeFilters}
                />
                <input 
                    type="number"
                    id="amountFilter"
                    name="amountFilter"
                    placeholder="Amount filtered by"
                    value={filters.amountFilter}
                    onChange={handleOnChangeFilters}
                />
                <select name="amountFilterType" id="amountFilterType" onChange={handleOnChangeFilters}>
                    <option value="">- - -</option>
                    <option value="greater">Greater Then</option>
                    <option value="equal">Equal To</option>
                    <option value="lesser">Less Then</option>
                </select>
                <input 
                    type="text"
                    id="recipientFilter"
                    name="recipientFilter"
                    placeholder="Recipient Name"
                    value={filters.recipientFilter}
                    onChange={handleOnChangeFilters}
                />
                <button type="submit">Search</button>
            </form>
            <h1>Current Request</h1>
            {currentRequests.length > 0 && <RequestContainer requests={currentRequests} handleFulfillRequest={handleFulfillRequest} /> }
            {currentRequests.length <= 0 && <p>No Current Requests</p> }
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
                    type="number"
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