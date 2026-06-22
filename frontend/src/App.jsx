import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Cookies from "js-cookie";

import Home from './components/pages/Home'
import Inventory from './components/pages/Inventory'
import Contacts from './components/pages/Contacts'
import UnauthorizedPg from './components/pages/UnauthorizedPg'
import LoginPg from './components/pages/LoginPg'

import './styles/App.css'

const App = () => {
  const handleLogout = (e)=>{
    e.preventDefault()
    Cookies.remove("jwt-authorization")
  }

  return (
    <BrowserRouter>
    {/* App must be wrapped in BrowserRouter to allow routing */}

      {/* Use the "to" parameter to set which route a link will use */}
      <header className="container">
        <h1>Gananoque Food Bank App</h1>
        <button onClick={handleLogout}><Link to="/">Logout</Link></button>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/contacts">Contacts</Link>
        </nav>
      </header>

      {/* "path" sets the url route goes to and "element" sets which component is rendered on the new page */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/" element={<LoginPg />} />
        <Route path="/unauthorized" element={<UnauthorizedPg/>} />
      </Routes>

      <footer className="container">
        <p>Developed by Bright Path Tech Initiative <br></br> 2026</p>
      </footer>

    </BrowserRouter>
  )
}

export default App
