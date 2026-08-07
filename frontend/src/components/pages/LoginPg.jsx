import { useState } from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const LoginPg = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null)

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
    handleLogin()
    setLoginData({name: "",password: ""})
  }
  const handleLogin = async () => {
    try {
      console.log("test")
      const response = await axios.post("http://localhost:3000/", loginData);
      setLoginResponse(response.data.message);

      if (response.status === 201)
      {
        navigate("/home");
        Cookies.set("jwt-authorization", response.data.token);
        setUserData(response.data.token)
      }

    } catch (err) {
      console.log(err)
    }

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