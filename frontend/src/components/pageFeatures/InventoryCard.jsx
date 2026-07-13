const InventoryCard = ({index, name, category, stock, selected, currentAction, handleOnSelect,setUpForEditing}) => {
    return (
        <tr>
            <td>{selected && "**" } {name} {selected && "**" }</td> 
            <td>{category}</td> 
            {currentAction != "selectStockToEdit" && <td>{stock}</td>} 
            {currentAction === "selectStockToEdit" && <td><button onClick={() => setUpForEditing("editStock", index)} >{stock}</button></td>}
            {currentAction === "delete" && <td><button onClick={() => handleOnSelect(index)} >{selected ? "Unselect" : "Select"}</button></td>}
        </tr>
    )
}
export default InventoryCard