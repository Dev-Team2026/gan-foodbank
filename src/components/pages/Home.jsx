import logo from '../../assets/GananoqueFoodBank.png'

const Home = () => {
  return(
    <div className="container">
      <title>Home</title>
      
      <h1>Home Page</h1>
      <div className='orgInfo'>
        <p>Established in 1987 by Audrey Jackson and the Gananoque Ministerial Committee(a group of Gananoque religious groups) and some dedicated volunteers.  The Gananoque and Area Food Bank operates on the premise that in a world where we have so much, no one should go hungry.</p>
        <p>We are an emergency community service providing food to our community as needed and as available.</p>
        <p>We are a registered non-profit charitable organization governed by a volunteer Board of Directors who are assisted by a group of committed volunteers. We are a non-denominational, non-political organization sustained solely by private donations and we do not receive any government funding.</p>
      </div>
      <img src={logo}></img>  
    </div>
  )
}

export default Home