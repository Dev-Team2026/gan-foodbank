import { useState, useEffect } from "react";
import axios from "axios";

const InventoryCount = () => {
    const [inventory, setInventory] = useState([])
    const [inventoryPostResponse, setInventoryPostResponse] = useState("")
    const [filters, setFilters] = useState({nameFilter: "", categoryFilter: "", sortBy: ""})
    const [counts, setCounts] = useState({})


    const handleInventoryDB = async ()=>{

        //console.log(filters.nameFilter != "")
        try {
            await axios.get("http://localhost:3000/inventory/all")
                .then((response)=>{
                    setInventory(()=>response.data)
                })
        } catch(error) {
            console.log(error.message)
        }
    }

    const search = async (event) => {
        setFilters({...filters, nameFilter: event.target.value})
    }

    const submitToServer = async () => {
       const confirmed = window.confirm(
            "Are you sure you want to submit these counts?"
        );

        if (!confirmed) {
            return;
        }
        try {
                console.log(counts)
                await axios.patch("http://localhost:3000/inventory/count", {counts})
                    .then((response)=>{
                        setInventoryPostResponse(()=>response.data)
                    console.log(response)
                })
                await handleInventoryDB()
                setCounts({})
            } catch (error) {
                console.log(error.message)
            }
    }

    useEffect(() => {
        handleInventoryDB()
    }, [inventoryPostResponse])
    useEffect(()=>{
        const applyFilters = async ()=>{
            console.log(filters)
            try {
                await axios.patch("http://localhost:3000/inventoryFilters", filters)
                    .then((response)=>{
                        setInventoryPostResponse(()=>response.data)
                    })
            } catch (error) {
                console.log(error.message)
            }
        }
        applyFilters()
    }, [filters])

    return (
        <div className="container">
            <title>Inventory Page</title>

            <h1>Inventory</h1>
            <p>Page for listing current inventory totals and adjustments</p>
            <input className="searchBar" placeholder="Type to search..." onChange={search} />

            <table>
                <thead>
                <tr>
                    <th>ITEM</th>
                    <th>IN SYSTEM</th>
                    <th>COUNT</th>
                </tr>
                </thead>
                <tbody>
                {inventory.map((item)=>(
                    <tr key={item.item_id}>
                        <td>{item.name}</td>
                        <td>{item.stock}</td>
                        <td><input type="number" min="0" value={counts[item.item_id]} onChange={(e) => {setCounts({...counts,[item.item_id]:e.target.value})}} /></td>
                    </tr>
                ))}
                </tbody>
            </table>

                <button className="countBtn" onClick={submitToServer}>Submit</button>

        </div>
    )
}

export default InventoryCount