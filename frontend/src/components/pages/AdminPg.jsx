import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import UserContainer from "../pageFeatures/UserContainer";

const AdminPg = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser}) => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [userPostResponse] = useState("")
  useEffect(()=>{
    if (currentUser[1] != "admin")
    {
        navigate("/")
        alert("only admin allowed")
    }
  })

  const handleUserDB = async ()=>{
    try {
      await axios.get("http://localhost:3000/users")
      .then((response)=>{
        setUsers(()=>response.data)
      })
    } catch(error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    handleUserDB()
  }, [userPostResponse])
  return(
    <div className="container">
      <PageHeader Link={Link} user={currentUser} />
      <AuthenticationChecker updateUser={updateUser} />
      <title>Admin</title>
      
      <h1>Welcome Back</h1>
      
      <h2>Registered Users</h2>
      <UserContainer users={users} />
    </div>
  )
}

export default AdminPg