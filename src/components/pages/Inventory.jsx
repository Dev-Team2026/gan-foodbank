const Inventory = () => {
  return (
    <div className="container">
      <h1>Inventory</h1>
      <p>Page for listing current inventory totals and adjustments</p>

      <table>
        <thead>
          <th>Item</th>
          <th>Category</th>
          <th>Count</th>
        </thead>
        <tbody>
          <tr>
            <td>Soup</td> 
            <td>Canned Goods</td> 
            <td>23</td>
          </tr>
        </tbody>
      </table>


    </div>
  )
}

export default Inventory