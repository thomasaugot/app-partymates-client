import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import "./Navbar.css"

function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <Link to="/">
        <button className="navbarButton">Home</button>
      </Link>

      <Link to="/events">
        <button className="navbarButton">Upcoming Events</button>
      </Link>

      {isLoggedIn && (
        <>
        <Link to={`/profile/${user._id}`}><button className="navbarButton">My Profile</button></Link>
        
          <button className="navbarButton" onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button className="navbarButton">Sign Up</button> </Link>
          <Link to="/login"> <button className="navbarButton">Login</button> </Link>
        </>
      )}      
    </nav>
  );
}

export default Navbar;