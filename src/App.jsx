import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import Inventory from './components/pages/Inventory'
import Contacts from './components/pages/Contacts'

import './styles/App.css'

const App = () => {
  return (
    <BrowserRouter>
    {/* App must be wrapped in BrowserRouter to allow routing */}
    
      <header>
        <h1>Gananoque Food Bank App</h1>

        {/* Use the "to" parameter to set which route a link will use */}
        <nav className='navBar'>
          <Link className='navLink' to="/">Home</Link>
          <Link className='navLink' to="/inventory">Inventory</Link>
          <Link className='navLink' to="/contacts">Contacts</Link>
        </nav>
      </header>

      {/* "path" sets the url route goes to and "element" sets which component is rendered on the new page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>

      <footer className="footContainer">
        <p>© 2026 BrightPath Tech. All Rights Reserved</p>
      </footer>

    </BrowserRouter>
  )
}

export default App
