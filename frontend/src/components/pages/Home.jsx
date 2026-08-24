import logo from '../../assets/GananoqueFoodBank.png'
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";


const Home = () => {

    const token = Cookies.get("jwt-authorization")

    let userData = null

    if (token) {
        userData = jwtDecode(token)
    }

    return (
        <div className="homeContainer">
            <div>
                <title>Home</title>
                <img src={logo}></img>
                <h1>Welcome {userData?.name}!</h1>
                <h1>Dashboard</h1>
                <h2>This will serve as the main landing page of the app, showing relevant top level info at a
                    glance</h2>
            </div>
        </div>
    )
}

export default Home