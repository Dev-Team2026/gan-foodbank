import { useState } from "react";
import Cookies from "js-cookie";
import jwtEncode from "jwt-encode";
//const jwt = require("jsonwebtoken")
import {useNavigate} from "react-router-dom";

const LoginPg = () => {
    const navigate = useNavigate();
    const [users] = useState([{name: "maxwell", password:123}])
    const [loginData, setLoginData] = useState({
        name: "",
        password: ""
    })
    const [loginResponse, setLoginResponse] = useState("")

    const handleOnChangeLogin = (e)=> {
        setLoginData((prevData) => {
            return{...prevData, [e.target.name]: e.target.value};
        })
    }

    const handleOnSubmitLogin = (e) => {
        e.preventDefault()
        //console.log(users)
        users.map((user) => {
            if(loginData.name === user.name)
            {
                //console.log(loginData.password + " " + user.password)
                if(loginData.password == user.password)
                {
                    setLoginResponse("welcome in")
                    navigate("/home")
                    Cookies.set("jwt-authorization", jwtEncode({name: user.name, password: user.password}, "test"))
                }else {
                    setLoginResponse("Invalid Password!")
                }
            } else {
                setLoginResponse("Invalid Username")
            }
        })
        setLoginData({name: "",password: ""})
    }

    return (
        <div>
            {loginResponse != "" && <p>{loginResponse}</p>}
            <br />
            <form onSubmit={handleOnSubmitLogin}>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={loginData.name}
                    onChange={handleOnChangeLogin}
                    placeholder="Enter name"
                    required
                />
                <br />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={loginData.password}
                    onChange={handleOnChangeLogin}
                    placeholder="Enter password"
                    required
                />
                <br />
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginPg