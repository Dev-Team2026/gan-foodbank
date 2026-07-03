import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import UserContainer from "../pageFeatures/UserContainer";
import AddUserForm from "../pageFeatures/AddUserForm";

const AdminPg = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser}) => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [userForm, setUserForm] = useState({})
  const [userPostResponse, setUserPostResponse] = useState("")
  const [currentAction, setCurrentAction] = useState("")
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

  const setAction = (action) => {
    setCurrentAction(action)
  }
  const handleOnChangeUser = (e) => {
    setUserForm({...userForm, [e.target.name]: e.target.value})
  }
  const handleOnSubmitUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/users", userForm)
        .then((response) => {
          setUserPostResponse(response.data)
        })
      setUserForm({})
    } catch (error) {
      console.log(error.message)
    }
  }

  return(
    <div className="container">
      <PageHeader Link={Link} user={currentUser} />
      <AuthenticationChecker updateUser={updateUser} />
      <title>Admin</title>
      
      <h1>Welcome Back</h1>
      <button onClick={()=>setAction("add")} >Add User</button>
      {currentAction === "add" && <AddUserForm handleOnChangeUser={handleOnChangeUser} handleOnSubmitUser={handleOnSubmitUser} newUser={userForm} /> }
      
      <h2>Registered Users</h2>
      <UserContainer users={users} />
    </div>
  )
}

export default AdminPg