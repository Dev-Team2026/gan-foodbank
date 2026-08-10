const InventoryCard = ({item_id, name, category, stock, selected, currentAction, handleOnSelect,setUpForEditing}) => {

    return (
        <tr>
            {currentAction != "selectItemNameToEdit" && <td>{selected && "**" } {name} {selected && "**" }</td>} 
            {currentAction === "selectItemNameToEdit" && <td><button className="tableBtn" onClick={() => setUpForEditing("editName", item_id)} >{name}</button></td>}
            {currentAction != "selectItemCategoryToEdit" && <td>{category}</td>} 
            {currentAction === "selectItemCategoryToEdit" && <td><button className="tableBtn" onClick={() => setUpForEditing("editCategory", item_id)} >{category}</button></td>}
            {currentAction != "selectStockToEdit" && <td>{stock}</td>} 
            {currentAction === "selectStockToEdit" && <td><button className="tableBtn"  onClick={() => setUpForEditing("editStock", item_id)} >{stock}</button></td>}
            {currentAction === "delete" && <td><button className="tableBtn" onClick={() => handleOnSelect(item_id)} >{selected ? "Unselect" : "Select"}</button></td>}
        </tr>
    )
}
export default InventoryCard