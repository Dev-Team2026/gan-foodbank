const NewOrderCard = ({orderItems, handleSubmitNewOrder, handleRemoveItemFromOrder, handleAdjustUnitQuatity, setIsDonation})=>{
    return ( <div>
        <select onChange={(e)=>setIsDonation(e.target.value)} >
            <option value={false}>False</option>
            <option value={true}>True</option>
        </select>
        {orderItems.map((item)=>(
            <p key={item.index} >
                <button onClick={()=>handleRemoveItemFromOrder(item.index, item.inventoryIndex)} ><b>X</b></button>
                {item.name} - {item.unitAmount} per unit | 
                <button onClick={()=>handleAdjustUnitQuatity(item.index, 1)} >+</button>
                {item.unitQuantity} Units
                {item.unitQuantity > 1 && <button onClick={()=>handleAdjustUnitQuatity(item.index, -1)} >-</button>}
            </p>
        ))}
        <button onClick={handleSubmitNewOrder} >Submit Order</button>
    </div> )
}
export default NewOrderCard