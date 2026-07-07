const InventoryCard = ({itemId, name, category, stock, selected, handleOnSelect}) => {
    return (
        <tr>
            <td>{selected && "**" } {name} {selected && "**" }</td> 
            <td>{category}</td> 
            <td>{stock}</td>
            <td><button onClick={() => handleOnSelect(itemId)} >{selected ? "Unselect" : "Select"}</button></td>
        </tr>
    )
}
export default InventoryCard