const InventoryCard = ({index, name, category, stock, selected, currentAction, handleOnSelect,setUpForEditing}) => {
    return (
        <tr>
            {currentAction != "selectItemNameToEdit" && <td>{selected && "**" } {name} {selected && "**" }</td>} 
            {currentAction === "selectItemNameToEdit" && <td><button onClick={() => setUpForEditing("editName", index)} >{name}</button></td>}
            {currentAction != "selectItemCategoryToEdit" && <td>{category}</td>} 
            {currentAction === "selectItemCategoryToEdit" && <td><button onClick={() => setUpForEditing("editCategory", index)} >{category}</button></td>}
            {currentAction != "selectStockToEdit" && <td>{stock}</td>} 
            {currentAction === "selectStockToEdit" && <td><button onClick={() => setUpForEditing("editStock", index)} >{stock}</button></td>}
            {currentAction === "delete" && <td><button onClick={() => handleOnSelect(index)} >{selected ? "Unselect" : "Select"}</button></td>}
        </tr>
    )
}
export default InventoryCard