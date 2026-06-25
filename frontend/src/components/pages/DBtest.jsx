import { useEffect, useState } from 'react'
import axios from "axios";

const Dbtest = () => {
  const [ data, setData] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => setData(response.data)) //console.log(response.data)) 
      .catch((err) => console.error(err))
      console.log(data)
  }, [])

  return(
    <div className="container">
      <title>Database Test</title>
      <h1>DB test</h1>
      <div>
        <ul>
          {data.map(user =>
            <li key={user.id}>
              {user.name}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Dbtest