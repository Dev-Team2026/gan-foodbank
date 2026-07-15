const EditStockForm = ({item, inventoryItemForm, handleOnChangeItemForm, handleOnSubmitStockEdit}) => {
    return (
        <div>
            <form>
                <button type="submit" formAction={()=>handleOnSubmitStockEdit(item.stock + inventoryItemForm.stock)} >Add</button>
                <input 
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Item stock"
                    value={inventoryItemForm.stock}
                    onChange={handleOnChangeItemForm}
                />
                <button type="submit" formAction={()=>handleOnSubmitStockEdit(item.stock - inventoryItemForm.stock)} >Subtract</button>
            </form>
        </div>
    )
}

export default EditStockForm