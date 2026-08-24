import { useState, useEffect } from "react"
import axios from "axios";
import {useNavigate} from "react-router-dom";


const OrdersPg = ()=>{
  const [orders, setOrders] = useState([])
  const [groupId, setGroupId] = useState(null)
  const [currentOrderGroup, setCurrentOrderGroup] = useState([])
  const navigate = useNavigate();

  //Db and useEffect statements
  const handleOrdersDB = async ()=>{
    try {
      await axios.get("http://localhost:3000/orders")
      .then((response)=> {
        const sortedOrders = [...response.data.db].sort(
            (a, b) => new Date(b.created_date) - new Date(a.created_date))

        setOrders(sortedOrders)

        setGroupId(response.data.currentGroup)
      })
    } catch(error) {
      console.log(error.message)
    }
  }

  const updateOrderItems = async ()=>{
    try {
      await axios.get(`http://localhost:3000/orders/${groupId}`)
      .then((response)=>{
        setCurrentOrderGroup(response.data.items)
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  
  useEffect(() => {
    handleOrdersDB()
  }, )
  useEffect(()=>{
    updateOrderItems()
  }, [groupId])

  return (
      <div className="ordersDiv">
        <table>
          <thead>
              <tr>
                <th>PO #</th>
                <th>Order Date</th>
                <th>Date Rec.</th>
              </tr>
          </thead>
          <tbody>
          {currentOrderGroup.length === null && <tr>
            <td>Your current</td>
            <td>orders are</td>
            <td>Please create a</td>
            <td> new order</td>
          </tr>}
          {orders.map((order) => (
            <tr key={order.order_id}
            onClick={() => navigate(`/orders/${order.order_id}`)}
                style={{cursor : "pointer"}}
            >
              <td>{order.order_id}</td>
              <td>{order.created_date}</td>
              {order.received_date && <td>{order.received_date}</td>}
              {!order.received_date && <td>Order not yet received</td>}
            </tr>
              ))}
              <tr>

              </tr>
          </tbody>
        </table>
  </div>)
}
export default OrdersPg