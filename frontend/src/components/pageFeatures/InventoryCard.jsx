const InventoryCard = ({item_id, name, category, stock, selected, currentAction, handleOnSelect}) => {
    return (
        <tr>
            <td>{selected && "**" } {name} {selected && "**" }</td> 
            <td>{category}</td> 
            <td>{stock}</td>
            {currentAction === "delete" && <td><button onClick={() => handleOnSelect(item_id)} >{selected ? "Unselect" : "Select"}</button></td>}
        </tr>
    )
}
export default InventoryCard