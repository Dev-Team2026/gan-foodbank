const RequestFilter = ({handleOnSubmitFilters, handleOnChangeFilters, filters}) => {
    return (
        <div>
             <form onSubmit={handleOnSubmitFilters}>
                <input 
                    type="text"
                    id="itemFilter"
                    name="itemFilter"
                    placeholder="Product Name"
                    value={filters.itemFilter}
                    onChange={handleOnChangeFilters}
                />
                <input 
                    type="number"
                    id="amountFilter"
                    name="amountFilter"
                    placeholder="Amount filtered by"
                    value={filters.amountFilter}
                    onChange={handleOnChangeFilters}
                />
                <select name="amountFilterType" id="amountFilterType" onChange={handleOnChangeFilters}>
                    <option value="">- - -</option>
                    <option value="greater">Greater Then</option>
                    <option value="equal">Equal To</option>
                    <option value="lesser">Less Then</option>
                </select>
                <input 
                    type="text"
                    id="recipientFilter"
                    name="recipientFilter"
                    placeholder="Recipient Name"
                    value={filters.recipientFilter}
                    onChange={handleOnChangeFilters}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default RequestFilter