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
        <p>Hello {user[0]}</p>
        <button onClick={handleLogout}><Link to="/login">Logout</Link></button>
        {/* Use the "to" parameter to set which route a link will use */}
        <nav className='navBar'>
          <Link className='navLink' to="/">Home</Link>
          <Link className='navLink' to="/inventory">Inventory</Link>
          {user[1] === "admin" && <Link className='navLink' to="/admin">Admin Dashboard</Link>}
        </nav>
      </header>
    </div>
  )
}

export default PageHeader