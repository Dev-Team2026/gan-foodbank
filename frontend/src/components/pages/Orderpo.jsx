import { useState, useEffect } from "react"
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import OrdersCard from "../pageFeatures/OrdersCard.jsx";
import * as XLSX from "xlsx"


const OrderPo = ()=>{
    const {id} = useParams()
    const [orders, setOrders] = useState([])
    const [currentOrderGroup, setCurrentOrderGroup] = useState([])
    //const [orderItems, setOrderItems] = useState([])
    const [dbResponse, setDbResponse] = useState("")
    const navigate = useNavigate();
    //Db and useEffect statements
    const handleOrdersDB = async ()=>{
        try {
            await axios.get("http://localhost:3000/orders")
                .then((response)=>{
                    //console.log(response.data)
                    setOrders(response.data.db)
                    //setCurrentOrderGroup(response.data.currentGroup)
                })
        } catch(error) {
            console.log(error.message)
        }
        //console.log(orders[currentOrderGroup].order_items)
    }

    const updateOrderItems = async ()=>{
        try {
            await axios.get(`http://localhost:3000/orders/${id}`)
                .then((response)=>{
                    setCurrentOrderGroup(response.data.items)
                    //console.log(response.data)
                    console.log("Items:", response.data.items);
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
    }, [id])

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
            await axios.patch(`http://localhost:3000/ordersItems`, {id: id, items: currentOrderGroup})
                .then((response)=>{
                    setDbResponse(response.data)
                })
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleExportOrder = (e) => {
        e.preventDefault();

        const data = currentOrderGroup.map((item) => ({
            Name: item.name,
            "Requested Amount": item.requestedAmount,
            Fulfilled: item.fufillment,
            Count: null
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Order");

        XLSX.writeFile(workbook, `order-${id}.xlsx`);
    };

    return (
        <div className="ordersDiv">
            <button onClick={() => {navigate("/orders")}}>Go Back</button>
            <table>
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Fulfillment</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {currentOrderGroup.length === 0 ? (
                    <tr>
                        <td colSpan="4">
                            Your current order has no items.
                        </td>
                    </tr>
                ) : (
                    (currentOrderGroup.map((item)=>(
                            <OrdersCard key={item.id} {...item} toggleEarlyClose={toggleEarlyClose} handeleOnChangeFufillment={handeleOnChangeFufillment} handeleOnAddCost={handeleOnAddCost} />
                        )
                    ))
                )}
                </tbody>
            </table>
            <button className="tableBtn" onClick={handleUpdateOrder} >Apply Updates</button>
            <button className="tableBtn" onClick={handleExportOrder} >Export</button>
        </div>)
}
export default OrderPo
