// styling
import "./NavBar.css";

// bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="nav-bar">
      <Container>
        <Navbar.Brand href="#home">wol-api</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">home</Nav.Link>
            <Nav.Link
              href="https://github.com/j-koziel/wol-api"
              target="_blank"
              className="gh-lnk"
            >
              <i class="fa-brands fa-github"></i>
            </Nav.Link>
            <Nav.Link href="#contact-me" className="contact-me">
              contact me
            </Nav.Link>
            <Nav.Link href="#gen-token">token?</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
