import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './components/pages/Home'
import LoginPg from './components/pages/LoginPg'
import AdminPg from './components/pages/AdminPg'
import Inventory from './components/pages/Inventory'
import OrdersPg from './components/pages/OrdersPg'
import Layout from "./components/pageFeatures/layout.jsx"
import ProtectedRoute from "./components/pageFeatures/protectroute.jsx"
import './styles/App.css'
import InventoryCount from "./components/pages/dailycount.jsx"
import OrderPo from "./components/pages/Orderpo.jsx"

const App = () => {

    return (
        <BrowserRouter>
            {/* App must be wrapped in BrowserRouter to allow routing */}

            {/* "path" sets the url route goes to and "element" sets which component is rendered on the new page */}
            <Routes>
                <Route path="/" element={<LoginPg/>}/>
                <Route element={<Layout/>}>
                    <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                    <Route path="/admin" element={<ProtectedRoute><AdminPg/></ProtectedRoute>}/>
                    <Route path="/inventory" element={<ProtectedRoute><Inventory/></ProtectedRoute>}/>
                    <Route path="/count" element={<ProtectedRoute><InventoryCount/></ProtectedRoute>}/>
                    <Route path="/orders" element={<ProtectedRoute><OrdersPg/></ProtectedRoute>}/>
                    <Route path="/orders/:id" element={<ProtectedRoute><OrderPo/></ProtectedRoute>}/>
                </Route>
            </Routes>

            <footer className="footContainer">
                <p>© 2026 BrightPath Tech. All Rights Reserved</p>
            </footer>
        </BrowserRouter>
    )
}
//<OrdersPg PageHeader={PageHeader} Link={Link} AuthenticationChecker={AuthenticationChecker} currentUser={currentUser} updateUser={updateUser} />
export default App
