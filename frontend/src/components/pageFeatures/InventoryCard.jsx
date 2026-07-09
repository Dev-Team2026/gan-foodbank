const InventoryCard = ({index, name, category, stock, selected, currentAction, handleOnSelect}) => {
    return (
        <tr>
            <td>{selected && "**" } {name} {selected && "**" }</td> 
            <td>{category}</td> 
            <td>{stock}</td>
            {currentAction === "delete" && <td><button onClick={() => handleOnSelect(index)} >{selected ? "Unselect" : "Select"}</button></td>}
        </tr>
    )
}
export default InventoryCard