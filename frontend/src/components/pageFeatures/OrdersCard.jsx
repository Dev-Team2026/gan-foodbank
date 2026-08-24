import {useState} from "react"

const OrdersCard = ({
                        id,
                        name,
                        requestedAmount,
                        fufillment,
                        itemCost,
                        itemStatus,
                        unitType,
                        toggleEarlyClose,
                        handeleOnChangeFufillment,
                        handeleOnAddCost
                    }) => {
    const [newCost, setNewCost] = useState("0.00")
    const statusDisplay = (status) => {
        let content
        switch (status) {
            case 0:
                content = "Pending"
                break
            case 1:
                content = "Partial"
                break
            default:
                content = "Closed"
                break
        }
        return content
    }
    const handeleOnChangeCost = (e) => {
        //let value = e.target.value
        console.log(parseFloat(e.target.value))
        setNewCost(parseFloat(e.target.value).toFixed(2))
    }
    return (
        <tr>
            {itemStatus == 2 ? <td><s>{name}</s></td> : <td>{name}</td>}
            {itemStatus == 3 ?
                <td>{requestedAmount} {unitType}</td> :
                itemStatus == 2 ?
                    <td><s>{fufillment}|{requestedAmount} {unitType}</s></td>
                    :
                    <td>
                        <input type="number" min="0" value={fufillment}
                               onChange={(e) => handeleOnChangeFufillment(id, e)}/>
                        |{requestedAmount} {unitType}
                    </td>
            }
            {itemStatus == 3 ?
                <td>Donated</td> :
                itemStatus == 2 ?
                    <td><s>{itemCost} $ </s></td>
                    :
                    <td>
                        <input type="number" min={0.00} value={newCost} onChange={handeleOnChangeCost}/>$
                        <button onClick={() => {
                            handeleOnAddCost(id, parseFloat(newCost))
                            setNewCost("0.00")
                        }}>Add</button> <br/>
                        {itemCost} $
                    </td>
            }
            {itemStatus == 2 ? <td><s>{statusDisplay(itemStatus)}</s></td> : <td>{statusDisplay(itemStatus)}</td>}

            {(itemStatus != 3 && fufillment < requestedAmount) && <td>
                <button onClick={() => toggleEarlyClose(id)}>{itemStatus == 2 ? "Reopen Item" : "Close Item"}</button>
            </td>}
        </tr>
    )
}
export default OrdersCard
//<button className="adminPgBtn" onClick={()=>prepAction(index, "edit")} >edit</button> <button className="adminPgBtn" onClick={()=>prepAction(index, "delete")} >delete</button>