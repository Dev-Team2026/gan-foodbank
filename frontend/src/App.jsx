import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Home from './components/pages/Home'
import PageHeader from './components/pageFeatures/PageHeader'
import UnauthorizedPg from './components/pages/UnauthorizedPg'
import LoginPg from './components/pages/LoginPg'
import AuthenticationChecker from './components/pageFeatures/authenticationChecker'
import AdminPg from './components/pages/AdminPg'
import Inventory from './components/pages/Inventory'
import './styles/App.css'

const App = () => {
  const [currentUser, setCurrentUser] = useState([])
  const updateUser = (user)=>{
    setCurrentUser(user);
  }
  return (
    <BrowserRouter>
    {/* App must be wrapped in BrowserRouter to allow routing */} 

      {/* "path" sets the url route goes to and "element" sets which component is rendered on the new page */}
      <Routes>
        <Route path="/" element={<Home PageHeader={PageHeader} Link={Link} AuthenticationChecker={AuthenticationChecker} currentUser={currentUser} updateUser={updateUser} />} />
        <Route path="/admin" element={<AdminPg PageHeader={PageHeader} Link={Link} AuthenticationChecker={AuthenticationChecker} currentUser={currentUser} updateUser={updateUser} />} />
        <Route path="/inventory" element={<Inventory PageHeader={PageHeader} Link={Link} AuthenticationChecker={AuthenticationChecker} currentUser={currentUser} updateUser={updateUser} />} />
        <Route path="/login" element={<LoginPg />} />
        <Route path="/unauthorized" element={<UnauthorizedPg/>} />
      </Routes>

      <footer className="footContainer">
        <p>© 2026 BrightPath Tech. All Rights Reserved</p>
      </footer>
    </BrowserRouter>
  )
}

export default App
