import { useState, useEffect } from "react"
import axios from "axios";

import OrdersCard from "../pageFeatures/OrdersCard";

const OrdersPg = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser})=>{
  const [orders, setOrders] = useState([])
  const [currentOrderGroup, setCurrentOrderGroup] = useState(0)
  //Db and useEffect statements
  const handleOrdersDB = async ()=>{
    try {
      await axios.get("http://localhost:3000/orders")
      .then((response)=>{
        //console.log(response.data)
        setOrders(()=>response.data)
      })
    } catch(error) {
      console.log(error.message)
    }
    console.log(orders[currentOrderGroup].order_items)
  }
  useEffect(() => {
    handleOrdersDB()
  }, [])

  const handleOnChangeOrderGroup = (e) => {
    setCurrentOrderGroup(e.target.value)
    console.log(orders)
  }

  return (<div>
    <PageHeader Link={Link} user={currentUser} />
    <AuthenticationChecker updateUser={updateUser} />
    <form action="">
        <select name="orderGroup" id="orderGroup" value={currentOrderGroup} onChange={handleOnChangeOrderGroup} >6</select>
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
            {orders[currentOrderGroup].order_items.map((order)=>(
                <OrdersCard key={order.orders_id} {...order} />
            ))}
        </tbody>
    </table>
  </div>)
}
export default OrdersPg
/*

*/