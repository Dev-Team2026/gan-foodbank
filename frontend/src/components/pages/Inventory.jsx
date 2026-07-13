import { useState, useEffect } from "react";
import axios from "axios";

import InventoryEditingCard from "../pageFeatures/InventoryEditingCard";
import InventoryCard from "../pageFeatures/InventoryCard";
import EditStockForm from "../pageFeatures/EditStockForm";
import EditItemStringForm from "../pageFeatures/EditItemStringForm";

const Inventory = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser}) => {
  const [inventory, setInventory] = useState([])
  const [inventoryItemForm, setInventoryItemForm] = useState({name: "", category: "", stock: 0})
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
    setInventoryItemForm({name: "", category: "", stock: 0})
    setCurrentAction("")
    unselectAll()
  }

  
  const setUpForEditing = (editAction, index) => {
    setCurrentAction([editAction, index])
    setInventoryItemForm({name: inventory[index].name, category: inventory[index].category, stock: 0})
  }

  const handleOnSubmitStockEdit = async (newValue) => {
    //console.log(newValue)
    try {
      await axios.patch(`http://localhost:3000/inventoryStock`, {item: inventory[currentAction[1]], newValue: newValue})
        .then((response)=>{
          setInventoryPostResponse(()=>response.data)
        })
    } catch (error) {
        console.log(error.message)
    }
    resetAction()
  }
  const handleOnSubmitStringValueEdit = async (newValue, targetValue) => {
    //console.log(newValue)
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

  //sort and filter test
  const masterInventory = inventory
  const search = (event) => {
    const regx = new RegExp(event.target.value)
    setInventory(inventory.filter((item) => {return regx.test(item.name) }))
  }

  const testSort = () => {
    let testInventory = inventory
    testInventory.sort((a, b)=>{return a.stock - b.stock})
    console.log(testInventory)
    setInventory(testInventory)
  }


  return (
    <div className="container">
      <PageHeader Link={Link} user={currentUser} />
      <AuthenticationChecker updateUser={updateUser} />
      <title>Inventory Page</title>

      <h1>Inventory</h1>
      <p>Page for listing current inventory totals and adjustments</p>
      {currentAction === "add" && 
        <InventoryEditingCard 
          inventoryItem={inventoryItemForm} 
          currentAction={currentAction} 
          handleAddNewItem={handleAddNewItem}
          handleEditItem={handleEditItem}
          handleOnChangeItemForm={handleOnChangeItemForm}
      />}
      {currentAction[0] === "editStock" && <EditStockForm item={inventory[currentAction[1]]} inventoryItemForm={inventoryItemForm} currentAction={currentAction} handleOnChangeItemForm={handleOnChangeItemForm} handleOnSubmitStockEdit={handleOnSubmitStockEdit} /> }
      {currentAction[0] === "editName" && <EditItemStringForm value={"name"} inventoryItemFormValue={inventoryItemForm.name} handleOnChangeItemForm={handleOnChangeItemForm} handleOnSubmitStringValueEdit={handleOnSubmitStringValueEdit} /> }
      {currentAction[0] === "editCategory" && <EditItemStringForm value={"category"} inventoryItemFormValue={inventoryItemForm.category} handleOnChangeItemForm={handleOnChangeItemForm} handleOnSubmitStringValueEdit={handleOnSubmitStringValueEdit} />}
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
      <br />
      {currentAction === "" ? <div>
        <button onClick={()=>setupAction("add")}>Add Item</button>
        <button onClick={()=>setupAction("delete")}>Delete Items</button>
      </div> :
      <button onClick={resetAction}>Cancel</button>}

      <input onChange={search} />
      <button onClick={testSort}>Sort</button>

      <table>
        <thead>
          <tr>
            <th>Item <br /> <button onClick={() => setupAction("selectItemNameToEdit")} >Update Item Name</button></th>
            <th>Category <br /> <button onClick={() => setupAction("selectItemCategoryToEdit")} >Update Item Category</button></th>
            <th>Count <br /> <button onClick={() => setupAction("selectStockToEdit")} >Update Item Stock</button></th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item)=>(
            <InventoryCard key={item.item_id} {...item} currentAction={currentAction} handleOnSelect={handleOnSelect} setUpForEditing={setUpForEditing} />
          ))}
        </tbody>
      </table>


    </div>
  )
}

export default Inventory