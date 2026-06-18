const RequestCard = ({amount, item, recipient}) => {
    return (
        <div>
            <p>{amount} {item} for {recipient}</p>
        </div>
    )
}
export default RequestCard