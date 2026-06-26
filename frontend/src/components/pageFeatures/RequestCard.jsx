const RequestCard = ({requestId,amount, item, recipient, handleFulfillRequest}) => {
    return (
        <div>
            <p>{amount} {item} for {recipient}</p>
            <button onClick={() =>
              handleFulfillRequest(requestId)
            }>Fulfill Request</button>
        </div>
    )
}
export default RequestCard