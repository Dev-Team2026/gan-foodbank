import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import Inventory from './components/pages/Inventory'
import Contacts from './components/pages/Contacts'
import PageHeader from './components/pageFeatures/PageHeader'

import './styles/App.css'

const App = () => {
  return (
    <BrowserRouter>
    {/* App must be wrapped in BrowserRouter to allow routing */}
    
      

      {/* "path" sets the url route goes to and "element" sets which component is rendered on the new page */}
      <Routes>
        <Route path="/" element={<Home PageHeader={PageHeader} Link={Link} />} />
        <Route path="/inventory" element={<Inventory PageHeader={PageHeader} Link={Link} />} />
        <Route path="/contacts" element={<Contacts PageHeader={PageHeader} Link={Link} />} />
      </Routes>

      <footer className="footContainer">
        <p>© 2026 BrightPath Tech. All Rights Reserved</p>
      </footer>

    </BrowserRouter>
  )
}

export default App
