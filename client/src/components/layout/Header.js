import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Apollo-blog</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/posts">
            Posts
          </Nav.Link>
        </Nav>
        <Nav variant="pills" className="me-start">
          <Button as={Link} to="/login" className="me-2">
            Log in
          </Button>
          <Button as={Link} to="/register" variant="outline-light">
            Sign up
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
