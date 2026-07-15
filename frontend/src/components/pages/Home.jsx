import logo from '../../assets/GananoqueFoodBank.png'
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser}) => {
  const [inventory, setInventory] = useState([])

  const loadReport = async () => {
    try {
      await axios.get("http://localhost:3000/inventory")
      .then((response)=>{
        setInventory(()=>response.data)
      })
    } 
    catch(error) {
      console.log(error.message)
    }
  }

  loadReport()

  return(
    <div className="container">
      <PageHeader Link={Link} user={currentUser} />
      <AuthenticationChecker updateUser={updateUser} />
      <title>Home</title>
      
      <h1>Dashboard</h1>
      <h2>This will serve as the main landing page of the app, showing relevant top level info at a glance</h2>
      <div>
          <h1>Database reports</h1>
          <select defaultValue="lowstock" onChange={loadReport}>
            <option value="lowstock">Low Stock</option>
          </select>

          <p>Current list of items below desired stock level</p>

          <table>
            <thead>
              <tr>
                <th>
                  Item
                </th>
                <th>
                  Count
                </th>
                <th>
                  Par
                </th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item)=>(
                item.stock < item.par ?
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.stock}</td>
                    <td>{item.par}</td>
                  </tr>
                : ""
              ))}
            </tbody>
          </table>
      </div>
      <img src={logo}></img> 
    </div>
  )
}

export default Home