import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import Inventory from './components/pages/Inventory'
import Contacts from './components/pages/Contacts'
import HeaderComponent from './components/page_sections/HeaderComponent'
import FooterComponent from './components/page_sections/FooterComponent'

import './styles/App.css'

const App = () => {
  return (
    <BrowserRouter>
    {/* App must be wrapped in BrowserRouter to allow routing */}
      <HeaderComponent Link={Link} />
      {/* "path" sets the url route goes to and "element" sets which component is rendered on the new page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>

      <FooterComponent />

    </BrowserRouter>
  )
}

export default App
