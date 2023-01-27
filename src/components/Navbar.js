import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import "./Navbar.css"

function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/events">
        <button>Upcoming Events</button>
      </Link>

      {isLoggedIn && (
        <>
        <button>My Profile</button>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}      
    </nav>
  );
}

export default Navbar;