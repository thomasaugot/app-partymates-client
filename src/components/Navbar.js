import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

function MyNavbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="transparent" expand="lg" className="Navbar" color="white">
        <Container className="divNavbar">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/">
              <button className="navbarButton">Home</button>
              </Link>
              <Link to="/events">
              <button className="navbarButton">Upcoming Events</button>
              </Link>
            {isLoggedIn && (
              <>
                <Link to={`/profile/${user._id}`}>
                <button className="navbarButton">My Profile</button>
                </Link>
                <button className="navbarButton" onClick={logOutUser}>
                  Logout
                </button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Link to="/signup">
                  <button className="navbarButton">Sign Up</button>{" "}
                </Link>
                <Link to="/login">
                  <button className="navbarButton">Login</button>{" "}
                </Link>
              </>
            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
