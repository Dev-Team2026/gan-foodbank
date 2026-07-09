import { useState, useEffect } from "react";
import axios from "axios";

import InventoryEditingCard from "../pageFeatures/InventoryEditingCard";
import InventoryCard from "../pageFeatures/InventoryCard";

const Inventory = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser}) => {
  const [inventory, setInventory] = useState([])
  const [inventoryItemForm, setInventoryItemForm] = useState({name: "", category: "", stock: ""})
  const [currentAction, setCurrentAction] = useState("")
  const [inventoryPostResponse, setInventoryPostResponse] = useState("")
  const [itemsSelected, setItemsSelected] = useState(false)

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
  }, [inventoryPostResponse])

  const handleOnChangeItemForm = (e) => {
    setInventoryItemForm({...inventoryItemForm, [e.target.name]: e.target.value})
  }

  const handleAddNewItem = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:3000/inventory", inventoryItemForm)
            .then((response)=>{
                setInventoryPostResponse(()=>response.data)
            })
        resetAction()
    } catch (error) {
        console.log(error.message)
    }
  }

  const setupAction = (action) => {
    setCurrentAction(action)
  }

  const handleEditItem = (item_id) => {
    const updatedInventory = []
    inventory.map((item)=>{
      //console.log(item)
      if(item.item_id === item_id)
      {
        //console.log("!!!")
        updatedInventory.push({...inventoryItemForm, selected: false})
        //console.log(item.selected ? true : false)
      } else {
        updatedInventory.push({...item})
      }
    })
    setInventory(updatedInventory)
    resetAction()
  }

  const resetAction = () => {
    setInventoryItemForm({})
    setCurrentAction("")
    unselectAll()
  }

  
  const setForEditAction = (e) => {
    e.preventDefault();
    //let selectedItems = 0
    //inventory.map((item)=>{
    //  if(item.selected)
    //  {
    //    selectedItems++
    //    setInventoryItemForm({...item})
    //  }
    //})
    //if (selectedItems === 0){
    //  setPageResponse("Please select an item")
    //  resetItemForm()
    //} else if (selectedItems > 1){
    //  setPageResponse("Too many items select")
    //  resetItemForm()
    //} else {
    //  setCurrentAction("edit")
    //}

  }
  const DeleteItem = (e) => {
    e.preventDefault();
    inventory.forEach(async(item)=>{
      try {
        if (item.selected){
          await axios.delete(`http://localhost:3000/inventory/${item.item_id}`,)
            .then((response)=>{
              setInventoryPostResponse(()=>response.data)
            })
        }
      } catch (error) {
        console.log(error.message)
      }
    })
    resetAction()
    //const updatedInventory = []
    //inventory.map((item)=>{
    //  if(!item.selected)
    //  {
    //    updatedInventory.push({...item, item_id: updatedInventory.length})
    //  } 
    //})
    //if(updatedInventory.length === inventory.length){
    //  setPageResponse("Please select one or more items")
    //} else {
    //  setInventory(updatedInventory)
    //}
  }
  const unselectAll = () => {
    const updatedInventory = []
    inventory.map((item)=>{
      updatedInventory.push({...item, selected: false})
    })
    setInventory(updatedInventory)
    checkForSelection(updatedInventory)
  }

  const handleOnSelect = (index) => {
    let updatedInventory = []
    inventory.map((item)=>{
      updatedInventory.push({...item})
    })
    updatedInventory[index].selected = updatedInventory[index].selected ? false : true
    setInventory(updatedInventory)
    checkForSelection(updatedInventory)
  }

  const checkForSelection = (tempInventory) => {
    let selectedItems = 0
    tempInventory.map((item)=>{
      item.selected && ++selectedItems
    })
    selectedItems > 0 ? setItemsSelected(true) : setItemsSelected(false)
  }

  return (
    <div className="container">
      <PageHeader Link={Link} user={currentUser} />
      <AuthenticationChecker updateUser={updateUser} />
      <title>Inventory Page</title>

      <h1>Inventory</h1>
      <p>Page for listing current inventory totals and adjustments</p>
      <br />
      {currentAction === "" ? <div>
        <button onClick={()=>setupAction("add")}>Add Item</button>
        <button onClick={setForEditAction}>Edit Item</button>
        <button onClick={()=>setupAction("delete")}>Delete Items</button>
      </div> :
      <button onClick={resetAction}>Cancel</button>}
      <br />
      {currentAction === "add" && 
        <InventoryEditingCard 
          inventoryItem={inventoryItemForm} 
          currentAction={currentAction} 
          handleAddNewItem={handleAddNewItem}
          handleEditItem={handleEditItem}
          handleOnChangeItemForm={handleOnChangeItemForm}
      />}
      {currentAction === "delete" && 
        <div>
          {itemsSelected ? 
            <p>
              Are you sure you want to delete these items 
              <button onClick={DeleteItem}>Yes</button> 
              <button onClick={resetAction}>No</button>
            </p> : 
            <p>Please select items to delete</p>}
        </div> }
      
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item)=>(
            <InventoryCard key={item.item_id} {...item} currentAction={currentAction} handleOnSelect={handleOnSelect} />
          ))}
        </tbody>
      </table>


    </div>
  )
}

export default Inventory