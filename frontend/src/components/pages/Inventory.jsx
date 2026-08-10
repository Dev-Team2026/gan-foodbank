import { useState, useEffect } from "react";
import axios from "axios";

import InventoryEditingCard from "../pageFeatures/InventoryEditingCard";
import InventoryCard from "../pageFeatures/InventoryCard";
import EditItemIntForm from "../pageFeatures/EditItemIntForm";
import EditItemStringForm from "../pageFeatures/EditItemStringForm";
import NewOrderCard from "../pageFeatures/NewOrderCard";

const Inventory = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser}) => {
  //States
  const [inventory, setInventory] = useState([])
  const [inventoryItemForm, setInventoryItemForm] = useState({name: "", category: "", stock: 0})
  const [currentAction, setCurrentAction] = useState("")
  const [inventoryPostResponse, setInventoryPostResponse] = useState("")
  const [itemsSelected, setItemsSelected] = useState(false)
  const [filters, setFilters] = useState({nameFilter: "", categoryFilter: "", sortBy: ""})
  const [newOrder, setNewOrder] = useState([])
  //Db and useEffect statements
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
  useEffect(()=>{
    const applyFilters = async ()=>{
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
  //generic functions
  const handleOnChangeItemForm = (e) => {
    setInventoryItemForm({...inventoryItemForm, [e.target.name]: e.target.value})
  }
  const setupAction = (action) => {
    setCurrentAction(action)
  }
  const resetAction = () => {
    setInventoryItemForm({name: "", category: "", stock: 0})
    setCurrentAction("")
    setNewOrder([])
    unselectAll()
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
    let updatedInventory = [...inventory]
    //inventory.map((item)=>{
    //  updatedInventory.push({...item})
    //})
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
  //db setup functions
  const setUpForEditing = (editAction, index) => {
    setCurrentAction([editAction, index])
    setInventoryItemForm({name: inventory[index].name, category: inventory[index].category, stock: 0})
  }
  //Db submission functions
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
  const handleOnSubmitIntValueEdit = async (newValue, targetValue) => {
    try {
      await axios.patch(`http://localhost:3000/inventoryIntValue`, {item: inventory[currentAction[1]], newValue: newValue, targetValue: targetValue})
        .then((response)=>{
          setInventoryPostResponse(()=>response.data)
        })
    } catch (error) {
        console.log(error.message)
    }
    resetAction()
  }
  const handleOnSubmitStringValueEdit = async (newValue, targetValue) => {
    try {
      await axios.patch(`http://localhost:3000/inventoryStringValue`, {item: inventory[currentAction[1]], newValue: newValue, targetValue: targetValue})
        .then((response)=>{
          setInventoryPostResponse(()=>response.data)
        })
    } catch (error) {
        console.log(error.message)
    }
    resetAction()
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
  }
  const handleAddToNewOrder = (item_name, amount, inventoryIndex) => {
    setNewOrder([...newOrder, {index: newOrder.length, name: item_name, unitAmount: amount, unitQuantity: 1, inventoryIndex: inventoryIndex}])
    handleOnSelect(inventoryIndex)
  }
  const handleRemoveItemFromOrder = (index, inventoryIndex)=>{
    let updatedOrder = [...newOrder]
    if (index === "unknown")
    {
      for(let i =0; i < newOrder.length; i++){
        if (newOrder[i].inventoryIndex === inventoryIndex){
          index = i
          break
        }
      }
    }
    updatedOrder.splice(index, 1)
    updatedOrder.forEach((item)=>{
      if (item.index > index)
        item.index -= 1
    })
    setNewOrder(updatedOrder)
    handleOnSelect(inventoryIndex)
  }
  const handleAdjustUnitQuatity = (index, amount) => {
    let updatedOrder = [...newOrder]
    updatedOrder[index].unitQuantity += amount
    setNewOrder(updatedOrder)
  }
  const handleSubmitNewOrder = async () => {
    try {
      console.log(newOrder)
      await axios.post(`http://localhost:3000/orders`, {items: newOrder})
        .then((response)=>{
          setInventoryPostResponse(()=>response.data)
        })
      resetAction()
    } catch (error) {
        console.log(error.message)
    }
  }
  //sorting functions
  const search = async (event) => {
    setFilters({...filters, nameFilter: event.target.value})
  }
  const sort = (sortingTarget) => {
    setFilters({...filters, sortBy: sortingTarget})
  }


  return (
    <div className="container">
      <PageHeader Link={Link} user={currentUser} />
      <AuthenticationChecker updateUser={updateUser} />
      <title>Inventory Page</title>
      <h1>Inventory</h1>
      <p>Page for listing current inventory totals and adjustments</p>
      {currentAction === "add" && <InventoryEditingCard 
        inventoryItem={inventoryItemForm} 
          currentAction={currentAction} 
          handleAddNewItem={handleAddNewItem}
        handleOnChangeItemForm={handleOnChangeItemForm}/>
      }
      {currentAction[0] === "editStock" && <EditItemIntForm value={"stock"} item={inventory[currentAction[1]]} inventoryItemFormValue={inventoryItemForm.stock} currentAction={currentAction} handleOnChangeItemForm={handleOnChangeItemForm} handleOnSubmitIntValueEdit={handleOnSubmitIntValueEdit} /> }
      {currentAction[0] === "editName" && <EditItemStringForm value={"name"} inventoryItemFormValue={inventoryItemForm.name} handleOnChangeItemForm={handleOnChangeItemForm} handleOnSubmitStringValueEdit={handleOnSubmitStringValueEdit} /> }
      {currentAction[0] === "editCategory" && <EditItemStringForm value={"category"} inventoryItemFormValue={inventoryItemForm.category} handleOnChangeItemForm={handleOnChangeItemForm} handleOnSubmitStringValueEdit={handleOnSubmitStringValueEdit} />}
      {currentAction === "delete" && 
        <div>
          {itemsSelected ? 
            <p>
              Are you sure you want to delete these items 
              <button className="invOptionBtn" onClick={DeleteItem}>Yes</button> 
              <button className="invOptionBtn" onClick={resetAction}>No</button>
            </p> : 
            <p>Please select items to delete</p>}
        </div> }
      <br />
      {currentAction === "" ? <div>
        <button className="invOptionBtn" onClick={()=>setupAction("add")}>Add Item</button>
        <button className="invOptionBtn" onClick={()=>setupAction("delete")}>Delete Items</button>
        <button className="invOptionBtn" onClick={()=>setupAction("order")}>Create New Order</button>
        <br />
        <input onChange={search} />
      </div> :
      <button className="invOptionBtn" onClick={resetAction}>Cancel</button>}
      <table>
        <thead>
          <tr>
            <th>
                <button className="invTableBtn" onClick={()=>sort("nameAsc")}>Asc</button> 
                <button className="invTableBtn" onClick={()=>sort("nameDesc")}>Desc</button> <br /> 
                Item <br /> 
                <button className="invTableBtn" onClick={() => setupAction("selectItemNameToEdit")} >Update Item Name</button>
            </th>
            <th>
                <button className="invTableBtn" onClick={()=>sort("categoryAsc")}>Asc</button>
                <button className="invTableBtn" onClick={()=>sort("categoryDesc")}>Desc</button> <br /> 
                Category <br /> 
                <button className="invTableBtn" onClick={() => setupAction("selectItemCategoryToEdit")} >Update Item Category</button>
            </th>
            <th>
                <button className="invTableBtn" onClick={()=>sort("stockAsc")}>Asc</button>
                <button className="invTableBtn" onClick={()=>sort("stockDesc")}>Desc</button> <br /> 
                Count <br /> 
                <button className="invTableBtn" onClick={() => setupAction("selectStockToEdit")} >Update Item Stock</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item)=>(
            <InventoryCard key={item.item_id} {...item} currentAction={currentAction} handleOnSelect={handleOnSelect} setUpForEditing={setUpForEditing} handleAddToNewOrder={handleAddToNewOrder} handleRemoveItemFromOrder={handleRemoveItemFromOrder} />
          ))}
        </tbody>
      </table>
      {currentAction === "order" && <NewOrderCard orderItems={newOrder} handleSubmitNewOrder={handleSubmitNewOrder} handleRemoveItemFromOrder={handleRemoveItemFromOrder} handleAdjustUnitQuatity={handleAdjustUnitQuatity} />}
    </div>
  )
}

export default Inventory