import { useState, useEffect } from "react"
import axios from "axios";

import OrdersCard from "../pageFeatures/OrdersCard";

const OrdersPg = ()=>{
  const [orders, setOrders] = useState([])
  const [groupId, setGroupId] = useState(1)
  const [currentOrderGroup, setCurrentOrderGroup] = useState([])
  //const [orderItems, setOrderItems] = useState([])
  const [dbResponse, setDbResponse] = useState("")
  //Db and useEffect statements
  const handleOrdersDB = async ()=>{
    try {
      await axios.get("http://localhost:3000/orders")
      .then((response)=>{
        //console.log(response.data)
        setOrders(response.data.db)
        //setCurrentOrderGroup(response.data.currentGroup)
        setGroupId(response.data.currentGroup)
      })
    } catch(error) {
      console.log(error.message)
    }
    //console.log(orders[currentOrderGroup].order_items)
  }
  const updateOrderItems = async ()=>{
    try {
      await axios.get(`http://localhost:3000/orders/${groupId}`)
      .then((response)=>{
        setCurrentOrderGroup(response.data.items)
        //console.log(response.data)
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  
  useEffect(() => {
    handleOrdersDB()
  }, [dbResponse])
  useEffect(()=>{
    updateOrderItems()
  }, [groupId])

  const handleOnChangeOrderGroup = (e) => {
    setGroupId(e.target.value)
    //setCurrentOrderGroup(orders[e.target.value].order_items)
    //setGroupId(e.target.value)
    //updateOrderItems()
    //console.log(e.target.value)
  }
  const handeleOnChangeFufillment = (id, e) => {
    let updatedItems = [...currentOrderGroup]
    updatedItems[id].fufillment = e.target.value
    if(e.target.value == 0){
      updatedItems[id].itemStatus = 0
    } else if (e.target.value < updatedItems[id].requestedAmount){
      updatedItems[id].itemStatus = 1
    } else {
      updatedItems[id].itemStatus = 2
    }
    setCurrentOrderGroup(updatedItems)
    //handleUpdateOrder()
  }
  const handeleOnAddCost = (id,amount)=>{
    let updatedItems = [...currentOrderGroup]
    console.log(typeof updatedItems[id].itemCost, typeof amount)
    updatedItems[id].itemCost += amount
    setCurrentOrderGroup(updatedItems)
  }

  const toggleEarlyClose = (id) => {
    let updatedItems = [...currentOrderGroup]
    updatedItems[id].itemStatus < 2 ? 
      updatedItems[id].itemStatus = 2 : 
      updatedItems[id].fufillment > 0 ? updatedItems[id].itemStatus = 1 : updatedItems[id].itemStatus = 0
    setCurrentOrderGroup(updatedItems)
    //handleUpdateOrder()
  }
  const handleUpdateOrder = async () => {
    try {
      await axios.patch(`http://localhost:3000/ordersItems`, {id: groupId, items: currentOrderGroup})
      .then((response)=>{
        setDbResponse(response.data)
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (<div>
    
    <form action="">
        <select name="orderGroup" id="orderGroup" onChange={handleOnChangeOrderGroup} >
          {orders.map((group)=>(
              <option key={group.order_id} value={group.order_id}>Group {group.order_id}</option>
            ))}
        </select>
    </form>
    <table>
        <thead>
            <tr><th>Status</th><th>Item</th><th>Amount</th><th>Cost</th></tr>
        </thead>
        <tbody>
            {currentOrderGroup.length > 0 && currentOrderGroup.map((order)=>(
                <OrdersCard key={order.id} {...order} toggleEarlyClose={toggleEarlyClose} handeleOnChangeFufillment={handeleOnChangeFufillment} handeleOnAddCost={handeleOnAddCost} />
            ))}
        </tbody>
    </table>
    <button onClick={handleUpdateOrder} >ApplyUpdates</button>
  </div>)
}
export default OrdersPg
/*
{PageHeader, Link, AuthenticationChecker, currentUser, updateUser}
<PageHeader Link={Link} user={currentUser} />
    <AuthenticationChecker updateUser={updateUser} />
*/