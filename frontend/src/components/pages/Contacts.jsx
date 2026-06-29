

const Contacts = ({PageHeader, Link, AuthenticationChecker}) => {
  
  return (
    <div className="container">
      <PageHeader Link={Link} />
      <AuthenticationChecker />
      <title>Contacts</title>
      <h1>Contacts page</h1>
      <p>Page for retreiving and managing patron info</p>
    </div>
  )
}

export default Contacts