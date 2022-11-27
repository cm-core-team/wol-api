// styling
import "./NavBar.css";

// bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <Navbar expand="lg" className="nav-bar" variant="dark">
      <Container>
        <Navbar.Brand
          href="/home"
          className="custom-brand"
          style={{ color: "#458588", hover: "#83a598" }}
        >
          wol-api
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/demo" className="demo-lnk">
              demo
            </Nav.Link>
            <Nav.Link href="/contact" className="contact-lnk">
              contact
            </Nav.Link>
            <Nav.Link href="/login" className="login-lnk">
              login
            </Nav.Link>
            <Nav.Link href="/login" className="signup-lnk">
              signup
            </Nav.Link>
            <Nav.Link
              href="https://github.com/j-koziel/wol-api"
              target="_blank"
              className="gh-lnk"
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
