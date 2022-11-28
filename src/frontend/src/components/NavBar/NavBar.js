// styling
import "./NavBar.css";

// bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="lg" className="nav-bar" variant="dark">
      <Container>
        <Navbar.Brand
          href="/home"
          className="custom-brand nav-lnk"
        >
          wol-api
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/demo" className="demo-lnk nav-lnk">
              demo
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="contact-lnk nav-lnk">
              contact
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login" className="login-lnk nav-lnk">
              login
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="signup-lnk nav-lnk">
              signup
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="https://github.com/j-koziel/wol-api"
              target="_blank"
              className="gh-lnk nav-lnk"
            >
              <i className="fa-brands fa-github"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
