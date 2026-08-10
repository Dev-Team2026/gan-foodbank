import { useState, useEffect } from "react";
import axios from "axios";

import InventoryEditingCard from "../pageFeatures/InventoryEditingCard";
import InventoryCard from "../pageFeatures/InventoryCard";
import EditStockForm from "../pageFeatures/EditStockForm";
import EditItemStringForm from "../pageFeatures/EditItemStringForm";

const Inventory = () => {
  const [inventory, setInventory] = useState([])
  const [inventoryItemForm, setInventoryItemForm] = useState({name: "", category: "", stock: 0})
  const [currentAction, setCurrentAction] = useState("")
  const [inventoryPostResponse, setInventoryPostResponse] = useState("")
  const [itemsSelected, setItemsSelected] = useState(false)
  const [filters, setFilters] = useState({nameFilter: "", categoryFilter: "", sortBy: ""})

  const handleInventoryDB = async ()=>{
    
    //console.log(filters.nameFilter != "")
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
  //const masterInventory = inventory
  const search = async (event) => {
    setFilters({...filters, nameFilter: event.target.value})
  }

  const sort = (sortingTarget) => {
    setFilters({...filters, sortBy: sortingTarget})
    //testInventory.sort((a, b)=>{return a.stock - b.stock})
  }


  return (
    <div className="container">
      <title>Inventory Page</title>

      <h1>Inventory</h1>
      <p>Page for listing current inventory totals and adjustments</p>
      {currentAction === "add" && 
        <InventoryEditingCard 
          inventoryItem={inventoryItemForm} 
          currentAction={currentAction} 
          handleAddNewItem={handleAddNewItem}
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
              <button className="invBttn" onClick={DeleteItem}>Yes</button> 
              <button className="invBttn" onClick={resetAction}>No</button>
            </p> : 
            <p>Please select items to delete</p>}
        </div> }
      <br />
      {currentAction === "" ? <div>
        <button className="invBttn" onClick={()=>setupAction("add")}>Add Item</button>
        <button className="invBttn" onClick={()=>setupAction("delete")}>Delete Items</button>
      </div> :
      <button className="invBttn" onClick={resetAction}>Cancel</button>}

      <input className="searchBar" placeholder="Type to Search" onChange={search} />

      <table>
        <thead>
          <tr>
            <th>
                <button className="invBttn" onClick={()=>sort("nameAsc")}>Asc</button> 
                <button className="invBttn" onClick={()=>sort("nameDesc")}>Desc</button> <br /> 
                Item <br /> 
                <button className="invBttn" onClick={() => setupAction("selectItemNameToEdit")} >Update Item Name</button>
            </th>
            <th>
                <button className="invBttn" onClick={()=>sort("categoryAsc")}>Asc</button>
                <button className="invBttn" onClick={()=>sort("categoryDesc")}>Desc</button> <br /> 
                Category <br /> 
                <button className="invBttn" onClick={() => setupAction("selectItemCategoryToEdit")} >Update Item Category</button>
            </th>
            <th>
                <button className="invBttn" onClick={()=>sort("stockAsc")}>Asc</button>
                <button className="invBttn" onClick={()=>sort("stockDesc")}>Desc</button> <br /> 
                Count <br /> 
                <button className="invBttn" onClick={() => setupAction("selectStockToEdit")} >Update Item Stock</button>
            </th>
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