import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import UserContainer from "../pageFeatures/UserContainer";
import AddUserForm from "../pageFeatures/AddUserForm";
import EditUserForm from "../pageFeatures/EditUserForm";

const AdminPg = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser}) => {
  //states & nav
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [userForm, setUserForm] = useState({name: "", password: "", role: ""})
  const [userPostResponse, setUserPostResponse] = useState("")
  const [currentAction, setCurrentAction] = useState("")
  //Db and useEffect statements
  useEffect(()=>{
    if (currentUser[1] != 1)
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
  //generic functions
  const prepAction = (index, actionType) => {
    setCurrentAction(actionType)
    setUserForm({id: users[index].user_id, name: users[index].first_name, password: users[index].password, role: users[index].role})
  }
  const handleOnChangeUser = (e) => {
    setUserForm({...userForm, [e.target.name]: e.target.value})
  }
  //Db submission functions
  const handleOnSubmitUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/users", userForm)
        .then((response) => {
          setUserPostResponse(response.data)
        })
      setUserForm({name: "", password: "", role: ""})
      setCurrentAction("")
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleOnSubmitEditedUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch("http://localhost:3000/users", userForm)
        .then((response) => {
          setUserPostResponse(response.data)
        })
      setUserForm({name: "", password: "", role: ""})
      setCurrentAction("")
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleOnDeleteUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .delete(`http://localhost:3000/users/${userForm.id}`)
        .then((response) => {
          setUserPostResponse(response.data)
        })
      setUserForm({name: "", password: "", role: ""})
      setCurrentAction("")
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
      {currentAction === "" && <button className="adminPgBtn" onClick={()=>setCurrentAction("add")} >Add User</button>}
      {currentAction === "add" && <AddUserForm handleOnChangeUser={handleOnChangeUser} handleOnSubmitUser={handleOnSubmitUser} newUser={userForm} /> }
      {currentAction === "edit" && <EditUserForm handleOnChangeUser={handleOnChangeUser} handleOnSubmitEditedUser={handleOnSubmitEditedUser} user={userForm} /> }
      {currentAction === "delete" && 
        <p>Are you sure you want to delete this user<button className="adminPgBtn" onClick={handleOnDeleteUser} >Yes</button><button className="adminPgBtn" onClick={()=>setCurrentAction("")} >No</button></p> }
      {currentAction != "" && <button className="adminPgBtn" onClick={()=>setCurrentAction("")} >Cancel</button>}
      <h2>Registered Users</h2>
      <UserContainer users={users} prepAction={prepAction} />
    </div>
  )
}

export default AdminPg