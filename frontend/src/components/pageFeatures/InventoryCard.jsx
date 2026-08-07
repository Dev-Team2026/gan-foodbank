const InventoryCard = ({index, name, category, stock, selected, currentAction, handleOnSelect,setUpForEditing, handleAddToNewOrder}) => {
    return (
        <tr>
            {currentAction != "selectItemNameToEdit" && <td>{selected && "**" } {name} {selected && "**" }</td>} 
            {currentAction === "selectItemNameToEdit" && <td><button className="invTableBtn" onClick={() => setUpForEditing("editName", index)} >{name}</button></td>}
            {currentAction != "selectItemCategoryToEdit" && <td>{category}</td>} 
            {currentAction === "selectItemCategoryToEdit" && <td><button className="invTableBtn" onClick={() => setUpForEditing("editCategory", index)} >{category}</button></td>}
            {currentAction != "selectStockToEdit" && <td>{stock}</td>} 
            {currentAction === "selectStockToEdit" && <td><button className="invTableBtn" onClick={() => setUpForEditing("editStock", index)} >{stock}</button></td>}
            {currentAction === "delete" && <td><button className="invTableBtn" onClick={() => handleOnSelect(index)} >{selected ? "Unselect" : "Select"}</button></td>}
            <td><button className="invTableBtn" onClick={() => handleAddToNewOrder(name, 3)} >Order Item</button></td>
        </tr>
    )
}
export default InventoryCard