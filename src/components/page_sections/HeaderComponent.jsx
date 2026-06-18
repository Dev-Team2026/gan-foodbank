const HeaderComponent = ({Link}) => {
    return (
        <div>
            <header className="container">
            <h1>Gananoque Food Bank App</h1>

            {/* Use the "to" parameter to set which route a link will use */}
            <nav>
              <Link to="/">Home</Link>
              <Link to="/inventory">Inventory</Link>
              <Link to="/contacts">Contacts</Link>
              <Link to="/requests">Requests</Link>
            </nav>
          </header>
        </div>
    )
}

export default HeaderComponent