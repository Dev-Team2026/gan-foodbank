import RequestCard from "./RequestCard";
//{request.requestFulfilled === true && 
//  amount={request.amount} item={request.item} recipient={request.recipient}
const RequestContainer = ({requests, handleFulfillRequest}) => {
    return (
        <div>
            {requests.map((request)=>(
                <RequestCard key={request.requestId} {...request} handleFulfillRequest={handleFulfillRequest} />
            ))}
        </div>
    )
}
export default RequestContainer