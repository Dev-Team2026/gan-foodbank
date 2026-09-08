import logo from '../../assets/GananoqueFoodBank.png'
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const token = Cookies.get("jwt-authorization");

    let userData = null;

    if (token) {
        userData = jwtDecode(token);
    }

    return (
        <div className="homeContainer">

            <section className="dashboardLayout">
                <div className="welcomeSection">
                    <div className="welcomeContent">
                        <img
                            className="homeLogo"
                            src={logo}
                            alt="Gananoque Food Bank"
                        />
                        <div className="welcomeText">
                            <p className="welcomeLabel">Welcome back</p>
                            <h1>
                                {userData?.name || "User"}!
                            </h1>
                            <span className="welcomeRole">
                        {userData?.role === 1
                            ? "Administrator"
                            : "Volunteer"}
                    </span>
                        </div>
                    </div>
                </div>
                <section className="dashboardSection">
                    <div className="dashboardHeader">
                        <h2>Dashboard</h2>
                        <p>
                            Here's a quick overview of the food bank system.
                        </p>
                    </div>
                    <div className="dashboardCards">
                        <div className="dashboardCard">
                            <div className="dashboardCardIcon">
                                📦
                            </div>
                            <div>
                                <h3>Orders</h3>
                                <p>
                                    View and manage current food bank orders.
                                </p>
                            </div>
                            <button className="dashboardCardBtn" onClick={() => {navigate("/orders")}}>
                                View Orders →
                            </button>
                        </div>
                        <div className="dashboardCard">
                            <div className="dashboardCardIcon">
                                🏷️
                            </div>
                            <div>
                                <h3>Inventory</h3>
                                <p>
                                    Check inventory levels and update stock.
                                </p>
                            </div>
                            <button className="dashboardCardBtn" onClick={() => {navigate("/inventory")}}>
                                View Inventory →
                            </button>
                        </div>
                        {userData?.role === 1 && (
                            <div className="dashboardCard">
                                <div className="dashboardCardIcon">
                                    👥
                                </div>
                                <div>
                                    <h3>Users</h3>
                                    <p>
                                        Manage registered users and permissions.
                                    </p>
                                </div>
                                <button className="dashboardCardBtn" onClick={() => {navigate("/admin")}}>
                                    Manage Users →
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </section>
        </div>
    )
}

export default Home;