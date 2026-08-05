import { useState, useEffect } from "react"
import axios from "axios";

import OrdersCard from "../pageFeatures/OrdersCard";

const OrdersPg = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser})=>{
  const [orders, setOrders] = useState([])
  const [groupId, setGroupId] = useState(0)
  const [currentOrderGroup, setCurrentOrderGroup] = useState([])
  const [dbResponse, setDbResponse] = useState("")
  //Db and useEffect statements
  const handleOrdersDB = async ()=>{
    try {
      await axios.get("http://localhost:3000/ordersOld")
      .then((response)=>{
        //console.log(response.data)
        setOrders(response.data.db)
        setCurrentOrderGroup(response.data.db[response.data.currentGroup].order_items)
      })
    } catch(error) {
      console.log(error.message)
    }
    //console.log(orders[currentOrderGroup].order_items)
  }
  useEffect(() => {
    handleOrdersDB()
  }, [dbResponse])

  const handleOnChangeOrderGroup = (e) => {
    setGroupId(e.target.value)
    setCurrentOrderGroup(orders[e.target.value].order_items)
    console.log(currentOrderGroup)
  }

  const handleRecieveOrder = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/ordersOld`, {group_id: groupId, order_id: id})
      .then((response)=>{
        setDbResponse(response.data)
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (<div>
    <PageHeader Link={Link} user={currentUser} />
    <AuthenticationChecker updateUser={updateUser} />
    <form action="">
        <select name="orderGroup" id="orderGroup" onChange={handleOnChangeOrderGroup} >
          {orders.map((group)=>(
              <option key={group.order_group_id} value={group.index}>Group {group.order_group_id}</option>
            ))}
        </select>
    </form>
    <table>
        <thead>
            <tr><th>id</th><th>item</th><th>amount</th><th>date_issued</th><th>date_recieved</th></tr>
        </thead>
        <tbody>
            <tr>
            <td>orders_id</td>
            <td>item_name</td>
            <td>amount</td>
            <td>date_issued</td>
            <td>date_recieved!</td>
            </tr>
            {currentOrderGroup.map((order)=>(
                <OrdersCard key={order.orders_id} {...order} handleRecieveOrder={handleRecieveOrder} />
            ))}
        </tbody>
    </table>
  </div>)
}
export default OrdersPg
/*

*/