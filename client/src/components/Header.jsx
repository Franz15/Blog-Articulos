import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar expand="md" sticky="top" className="bg-body-tertiary" >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home" style={{ padding: 20 }}>News</Nav.Link>
          <Nav.Link href="/archive" style={{ padding: 20 }}>Archive</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
