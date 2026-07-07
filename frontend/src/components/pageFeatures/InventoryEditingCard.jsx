const InventoryEditingCard = ({inventoryItem, currentAction, handleAddNewItem, handleEditItem, handleOnChangeItemForm}) => {
    return (
        <div>
            <form onSubmit={currentAction === "edit" ? () => handleEditItem(inventoryItem.itemId) : handleAddNewItem}>
                <input 
                    type="text"
                    id="item"
                    name="item"
                    placeholder="Item Name"
                    value={inventoryItem.item}
                    onChange={handleOnChangeItemForm}
                />
                <input 
                    type="text"
                    id="category"
                    name="category"
                    placeholder="Item Category"
                    value={inventoryItem.category}
                    onChange={handleOnChangeItemForm}
                />
                <input 
                    type="text"
                    id="count"
                    name="count"
                    placeholder="Item Count"
                    value={inventoryItem.count}
                    onChange={handleOnChangeItemForm}
                />
                <button type="submit">{currentAction === "editing" ? "Save" : "Add"}</button>
            </form>
        </div>
    )
}

export default InventoryEditingCard