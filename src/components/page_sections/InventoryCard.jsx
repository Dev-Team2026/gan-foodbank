const InventoryCard = ({itemId, item, category, count, selected, handleOnSelect}) => {
    return (
        <tr>
            <td>{selected && "**" } {item} {selected && "**" }</td> 
            <td>{category}</td> 
            <td>{count}</td>
            <td><button onClick={() => handleOnSelect(itemId)} >{selected ? "Unselect" : "Select"}</button></td>
        </tr>
    )
}
export default InventoryCard