import { useState, useEffect } from "react";
import axios from "axios";

import InventoryEditingCard from "../pageFeatures/InventoryEditingCard";
import InventoryCard from "../pageFeatures/InventoryCard";

const Inventory = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser}) => {
  const [inventory, setInventory] = useState([])
  const [inventoryItemForm, setInventoryItemForm] = useState({
    item: "",
    category: "",
    count: ""
  })
  const [currentAction, setCurrentAction] = useState("")
  const [pageResponse, setPageResponse] = useState("")

  const handleInventoryDB = async ()=>{
    try {
      await axios.get("http://localhost:3000/inventory")
      .then((response)=>{
        setInventory(()=>response.data)
      })
    } catch(error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    handleInventoryDB()
  })

  const handleOnChangeItemForm = (e) => {
    setInventoryItemForm({...inventoryItemForm, [e.target.name]: e.target.value})
  }

  const handleAddNewItem = (e) => {
    e.preventDefault();
    const newInventory = inventory
    newInventory.push({...inventoryItemForm, itemId: inventory.length, selected: false})
    setInventory(newInventory)
    resetItemForm()
    setPageResponse("Item Added")
  }

  const handleEditItem = (itemId) => {
    const updatedInventory = []
    inventory.map((item)=>{
      //console.log(item)
      if(item.itemId === itemId)
      {
        //console.log("!!!")
        updatedInventory.push({...inventoryItemForm, selected: false})
        //console.log(item.selected ? true : false)
      } else {
        updatedInventory.push({...item})
      }
    })
    setInventory(updatedInventory)
    setPageResponse("")
    resetItemForm()
  }

  const resetItemForm = () => {
    setInventoryItemForm({
      item: "",
      category: "",
      count: ""
    })
    setCurrentAction("")
  }

  const setForAddAction = (e) => {
    e.preventDefault();
    setCurrentAction("add")
  }
  const setForEditAction = (e) => {
    e.preventDefault();
    let selectedItems = 0
    inventory.map((item)=>{
      if(item.selected)
      {
        selectedItems++
        setInventoryItemForm({...item})
      }
    })
    if (selectedItems === 0){
      setPageResponse("Please select an item")
      resetItemForm()
    } else if (selectedItems > 1){
      setPageResponse("Too many items select")
      resetItemForm()
    } else {
      setCurrentAction("edit")
    }

  }
  const DeleteItem = (e) => {
    e.preventDefault();
    const updatedInventory = []
    inventory.map((item)=>{
      if(!item.selected)
      {
        updatedInventory.push({...item, itemId: updatedInventory.length})
      } 
    })
    if(updatedInventory.length === inventory.length){
      setPageResponse("Please select one or more items")
    } else {
      setInventory(updatedInventory)
    }
  }

  const handleOnSelect = (itemId) => {
    //console.log(itemId)
    const updatedInventory = []
    inventory.map((item)=>{
      if(item.itemId === itemId)
      {
        updatedInventory.push({...item, selected: item.selected ? false : true})
        //console.log(item.selected ? true : false)
      } else {
        updatedInventory.push({...item})
      }
    })
    setInventory(updatedInventory)
  }

  return (
    <div className="container">
      <PageHeader Link={Link} user={currentUser} />
      <AuthenticationChecker updateUser={updateUser} />
      <title>Inventory Page</title>

      <h1>Inventory</h1>
      <p>Page for listing current inventory totals and adjustments</p>
      <p>{pageResponse != "" && pageResponse}</p>
      <br />
      <button onClick={setForAddAction}>Add Item</button>
      <button onClick={setForEditAction}>Edit Item</button>
      <button onClick={DeleteItem}>Delete Items</button>
      <br />
      {currentAction != "" && 
        <InventoryEditingCard 
          inventoryItem={inventoryItemForm} 
          currentAction={currentAction} 
          handleAddNewItem={handleAddNewItem}
          handleEditItem={handleEditItem}
          handleOnChangeItemForm={handleOnChangeItemForm}
      />}
      
      <table>
        <thead>
          <th>Item</th>
          <th>Category</th>
          <th>Count</th>
        </thead>
        <tbody>
          {inventory.map((item)=>(
            <InventoryCard key={item.itemId} {...item} handleOnSelect={handleOnSelect} />
          ))}
        </tbody>
      </table>


    </div>
  )
}

export default Inventory