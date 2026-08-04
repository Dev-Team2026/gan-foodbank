const OrdersCard = ({orders_id, item_name, amount, date_issued, date_recieved}) => {
    return (
        <tr>
            <td>{orders_id}</td>
            <td>{item_name}</td>
            <td>{amount}</td>
            <td>{date_issued}</td>
            <td>{date_recieved}</td>
        </tr>
    )
}
export default OrdersCard
//<button className="adminPgBtn" onClick={()=>prepAction(index, "edit")} >edit</button> <button className="adminPgBtn" onClick={()=>prepAction(index, "delete")} >delete</button>