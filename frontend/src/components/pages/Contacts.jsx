const Contacts = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser}) => {
  return (
    <div className="container">
      <PageHeader Link={Link} username={currentUser[0]} />
      <AuthenticationChecker updateUser={updateUser} />
      <title>Contacts</title>
      <h1>Contacts page</h1>
      <p>Page for retreiving and managing patron info</p>
    </div>
  )
}

export default Contacts