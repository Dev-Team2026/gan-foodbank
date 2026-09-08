import {useState, useEffect} from "react"
import {Navigate} from "react-router-dom"
import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"
import axios from "axios"

import UserContainer from "../pageFeatures/UserContainer"
import AddUserForm from "../pageFeatures/AddUserForm"
import EditUserForm from "../pageFeatures/EditUserForm"

const AdminPg = () => {
    const [users, setUsers] = useState([])
    const [userForm, setUserForm] = useState({name: "", password: "", role: ""})
    const [userPostResponse, setUserPostResponse] = useState("")
    const [currentAction, setCurrentAction] = useState("")
    const token = Cookies.get("jwt-authorization")

    const [selectedReport, setSelectedReport] = useState(1)
    const [reportData, setReportData] = useState([])
    const [reportLoading, setReportLoading] = useState(true)

    let userData = null

    if (token) {
        userData = jwtDecode(token)
    }

    if (userData.role !== 1) {
        alert("only admin allowed")
        return <Navigate to="/home" replace/>
    }

    let reports = [
        {id: 1, name: "Low Stock"},
        {id: 2, name: "High Stock"},
        {id: 3, name: "Units"}
    ]

    useEffect(() => {
        setReportLoading(true)
        loadReport(selectedReport)
    }, [selectedReport])

    const loadReport = async (id) => {
        console.log(id)
        try {
            await axios.get(`http://localhost:3000/reports/${id}`)
                .then((response) => {
                    setReportData(response.data)
                    setReportLoading(false)
                })
        } catch (error) {
            console.log(error.message)
        }
    }


    const handleUserDB = async () => {
        try {
            await axios.get("http://localhost:3000/users")
                .then((response) => {
                    setUsers(() => response.data)
                })
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        handleUserDB()
    }, [userPostResponse])
    //generic functions
    const prepAction = (index, actionType) => {
        setCurrentAction(actionType)
        setUserForm({
            id: users[index].user_id,
            name: users[index].first_name,
            password: users[index].password,
            role: users[index].role
        })
    }
    const handleOnChangeUser = (e) => {
        setUserForm({...userForm, [e.target.name]: e.target.value})
    }
    //Db submission functions
    const handleOnSubmitUser = async (e) => {
        e.preventDefault()
        const confirmed = window.confirm(
            "Are you sure you want to add this user?"
        )

        if (!confirmed) {
            return
        }
        try {
            await axios
                .post("http://localhost:3000/users", userForm)
                .then((response) => {
                    setUserPostResponse(response.data)
                })
            alert("Added user successfully.")
            setUserForm({name: "", password: "", role: ""})
            setCurrentAction("")
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleOnSubmitEditedUser = async (e) => {
        e.preventDefault()
        const confirmed = window.confirm(
            "Are you sure you want to update this user?"
        )

        if (!confirmed) {
            return
        }
        try {
            await axios
                .patch("http://localhost:3000/users", userForm)
                .then((response) => {
                    setUserPostResponse(response.data)
                })
            alert("Successfully updated user.")
            setUserForm({name: "", password: "", role: ""})
            setCurrentAction("")
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleOnDeleteUser = async (e) => {
        e.preventDefault()
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        )

        if (!confirmed) {
            return
        }

        try {
            await axios
                .delete(`http://localhost:3000/users/${userForm.id}`)
                .then((response) => {
                    setUserPostResponse(response.data)
                })
            alert("User Deleted")
            setUserForm({name: "", password: "", role: ""})
            setCurrentAction("")
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="container">
            <div>
                <title>Admin</title>

                <h1>Welcome back {userData.name}</h1>
                <div className="userManagement">
                    <div className="userManagementHeader">
                        <div>
                            <h2>User Management</h2>
                            <p>Add, edit, or remove registered users.</p>
                        </div>

                        <button
                            className="addUserBtn"
                            onClick={() => setCurrentAction("add")}
                        >
                            + Add User
                        </button>
                    </div>

                    {currentAction === "add" && (
                        <div className="actionPanel">
                            <div className="actionPanelHeader">
                                <h3>Add User</h3>
                            </div>

                            <AddUserForm
                                handleOnChangeUser={handleOnChangeUser}
                                handleOnSubmitUser={handleOnSubmitUser}
                                newUser={userForm}
                            />
                        </div>
                    )}

                    {currentAction === "edit" && (
                        <div className="actionPanel">
                            <div className="actionPanelHeader">
                                <h3>Edit User</h3>
                            </div>

                            <EditUserForm
                                handleOnChangeUser={handleOnChangeUser}
                                handleOnSubmitEditedUser={handleOnSubmitEditedUser}
                                user={userForm}
                            />
                        </div>
                    )}

                    {currentAction === "delete" && (
                        <div className="deletePanel">
                            <h3>Delete User?</h3>

                            <p>
                                Are you sure you want to delete this user?
                            </p>

                            <div className="deleteActions">
                                <button
                                    className="confirmDeleteBtn"
                                    onClick={handleOnDeleteUser}
                                >
                                    Yes, Delete
                                </button>

                                <button
                                    className="cancelBtn"
                                    onClick={() => setCurrentAction("")}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}

                    {currentAction !== "" && (
                        <button
                            className="cancelActionBtn"
                            onClick={() => setCurrentAction("")}
                        >
                            Cancel
                        </button>
                    )}
                </div>
                <div className="usersDiv">
                    <h2>Registered Users</h2>
                    <UserContainer users={users} prepAction={prepAction}/>
                </div>
            </div>

            <div>
                <div>
                    <h1>Reports</h1>
                    <select value={selectedReport} onChange={e => setSelectedReport(e.target.value)}>
                        {reports.map((report, index) => (
                            <option key={index} value={report.id}>{report.name}</option>
                        ))}
                    </select>
                    <br></br>
                </div>

                <div className="tableDiv">
                    {reportLoading ? "" :
                        <table>
                            <thead>
                            <tr>
                                {Object.keys(reportData[0]).map((field, index) => (
                                    <th key={index}>{field}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {reportData.map((item, index) => (
                                <tr key={index}>
                                    {Object.keys(item).map((field, index) => (
                                        <td key={index}>{item[field]}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    }
                </div>

            </div>

        </div>
    )
}

export default AdminPg