import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Header() {
  return (
    <Navbar
      expand="md"
      sticky="top"
      className="bg-body-tertiary"
      style={{
        backgroundColor: "#f8f9fa",
        borderColor: "#e0e0e0",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home" style={{ color: "#0d6efd", padding: 20 }}>
            News
          </Nav.Link>
          <Nav.Link href="/archive" style={{ padding: 20 }}>
            Archive
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto p-4">
          <Button
            style={{
              backgroundColor: "#0d6efd",
              borderColor: "#0d6efd",
            }}
            href="/write"
          >
            New Article
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
