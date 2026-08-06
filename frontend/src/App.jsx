import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Home from './components/pages/Home'
import UnauthorizedPg from './components/pages/UnauthorizedPg'
import LoginPg from './components/pages/LoginPg'
import AuthenticationChecker from './components/pageFeatures/AuthenticationChecker.jsx'
import AdminPg from './components/pages/AdminPg'
import Inventory from './components/pages/Inventory'
import Layout from "./components/pageFeatures/layout.jsx";
import './styles/App.css'

const App = () => {
  const [currentUser, setCurrentUser] = useState([])

  return (
    <BrowserRouter>
    {/* App must be wrapped in BrowserRouter to allow routing */} 

      {/* "path" sets the url route goes to and "element" sets which component is rendered on the new page */}
      <Routes>
          <Route element={<Layout/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/admin" element={<AdminPg/>} />
                <Route path="/inventory" element={<Inventory/>} />
                <Route path="/login" element={<LoginPg />} />
                <Route path="/un    setCurrentUser(user);authorized" element={<UnauthorizedPg/>} />
          </Route>
      </Routes>

      <footer className="footContainer">
        <p>© 2026 BrightPath Tech. All Rights Reserved</p>
      </footer>
    </BrowserRouter>
  )
}

export default App
