const EditItemIntForm = ({value, item, inventoryItemFormValue, handleOnChangeItemForm, handleOnSubmitIntValueEdit}) => {
    return (
        <div>
            <form>
                <button type="submit" formAction={()=>handleOnSubmitIntValueEdit(item.stock + parseInt(inventoryItemFormValue), value)} >Add</button>
                <input 
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Item stock"
                    value={inventoryItemFormValue}
                    onChange={handleOnChangeItemForm}
                />
                <button type="submit" formAction={()=>handleOnSubmitIntValueEdit(item.stock - parseInt(inventoryItemFormValue), value)} >Subtract</button>
            </form>
        </div>
    )
}

export default EditItemIntForm