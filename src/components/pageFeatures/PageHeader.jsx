const PageHeader = ({Link}) => {
    return (
        <div>
            <header>
              <h1>Gananoque Food Bank App</h1>

              {/* Use the "to" parameter to set which route a link will use */}
              <nav className='navBar'>
                <Link className='navLink' to="/">Home</Link>
                <Link className='navLink' to="/inventory">Inventory</Link>
                <Link className='navLink' to="/contacts">Contacts</Link>
                <Link className='navLink' to="/camera">Camera</Link>
              </nav>
            </header>
        </div>
    )
}

export default PageHeader