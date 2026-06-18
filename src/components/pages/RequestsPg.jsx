import { useState } from "react";
import RequestContainer from "../page_sections/RequestContainer";

const RequestPg = () => {
    const [productRequest, setProductRequest] = useState({requestId: "", item: "", amount: "", recipient: "", requestFulfilled: false})
    const [currentRequests, setCurrentRequests] = useState([{requestId: "0", item: "Items", amount: "Amount", recipient: "Recipient", requestFulfilled: false}])

    const handleOnChangeProductRequest = (e) => {
        setProductRequest({...productRequest, [e.target.name]: e.target.value})
    }
    const handleOnSubmitProductRequest = (e) => {
        e.preventDefault();
        setProductRequest({requestId: currentRequests.length, ...productRequest})
        
        setCurrentRequests([ ...currentRequests, productRequest])
        setProductRequest({item: "", amount: "", recipient: ""})
    }
    
    return (
        <div>
            <h1>Current Request</h1>
            {currentRequests.length > 1 && <RequestContainer requests={currentRequests} /> }
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