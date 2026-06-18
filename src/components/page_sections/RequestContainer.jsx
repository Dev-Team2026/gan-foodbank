import RequestCard from "./RequestCard";
//{request.requestFulfilled === true && 
const RequestContainer = (requests) => {
    return (
        <div>
            {requests.map((request)=>(
                <RequestCard key={request.requestId} amount={request.amount} item={request.item} recipient={request.recipient} />
            ))}
        </div>
    )
}
export default RequestContainer