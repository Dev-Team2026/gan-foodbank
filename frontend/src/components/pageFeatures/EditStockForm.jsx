const EditStockForm = ({item, inventoryItemForm, currentAction, handleOnChangeItemForm, handleOnSubmitStockEdit}) => {
    return (
        <div>
            <form>
                <button type="submit" onClick={()=>handleOnSubmitStockEdit(item.stock + currentAction[2])} >Add</button>
                <input 
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Item stock"
                    value={inventoryItemForm.stock}
                    onChange={handleOnChangeItemForm}
                />
                <button type="submit" onClick={()=>handleOnSubmitStockEdit(item.stock - currentAction[2])} >Subtract</button>
            </form>
        </div>
    )
}

export default EditStockForm