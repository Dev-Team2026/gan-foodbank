import Cookies from "js-cookie";

const PageHeader = ({Link, user}) => {
  const handleLogout = (e)=>{
    e.preventDefault()
    Cookies.remove("jwt-authorization")
  }
  return (
    <div>
      <header>
        <h1>Gananoque Food Bank App</h1>
        <div className='headerLogoutSec' >
          <p>Hello {user[0]}</p>
          <button className="headerLogoutBtn" onClick={handleLogout}><Link to="/login">Logout</Link></button>
        </div>
        {/* Use the "to" parameter to set which route a link will use */}
        <nav className='navBar'>
          <Link className='navLink' to="/">Home</Link>
          {/*<Link className='navLink' to="/contacts">Contacts</Link>*/}
          {/*<Link className='navLink' to="/camera">Camera</Link>*/}
          <Link className='navLink' to="/inventory">Inventory</Link>
          {user[1] === 1 && <Link className='navLink' to="/admin">Admin Dashboard</Link>}
        </nav>
      </header>
    </div>
  )
}

export default PageHeader