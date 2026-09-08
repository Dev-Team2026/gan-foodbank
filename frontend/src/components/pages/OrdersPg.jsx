import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const OrdersPg = () => {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    const handleOrdersDB = async () => {
        try {
            const response = await axios.get("http://localhost:3000/orders")

            const sortedOrders = [...response.data.db].sort(
                (a, b) =>
                    new Date(b.created_date) -
                    new Date(a.created_date)
            )

            setOrders(sortedOrders)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        handleOrdersDB()
    }, [])

    return (
        <div className="ordersPage">

            <div className="ordersHeader">
                <div>
                    <h2>Orders</h2>
                    <p>View and manage food bank purchase orders.</p>
                </div>
            </div>

            <div className="ordersDiv">

                <div className="orderTableHeader">
                    <div>
                        <h3>Purchase Orders</h3>
                        <p className="orderTableDescription">
                            {orders.length} order
                            {orders.length !== 1 ? "s" : ""} in the system
                        </p>
                    </div>
                </div>

                <div className="orderTableWrapper">
                    <table className="orderTable">
                        <thead>
                        <tr>
                            <th>PO #</th>
                            <th>Order Date</th>
                            <th>Date Received</th>
                        </tr>
                        </thead>

                        <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="emptyOrder"
                                >
                                    No orders have been created yet.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr
                                    key={order.order_id}
                                    className="orderRow"
                                    onClick={() =>
                                        navigate(
                                            `/orders/${order.order_id}`
                                        )
                                    }
                                >
                                    <td>
                                            <span className="poNumber">
                                                #{order.order_id}
                                            </span>
                                    </td>

                                    <td>
                                        {order.created_date}
                                    </td>

                                    <td>
                                        {order.received_date ? (
                                            <span className="receivedDate">
                                                    {order.received_date}
                                                </span>
                                        ) : (
                                            <span className="notReceived">
                                                    Not yet received
                                                </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default OrdersPg