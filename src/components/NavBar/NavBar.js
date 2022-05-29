import { Navbar, Container, Nav } from "react-bootstrap/";
import { BrowserRouter as Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar collapseOnSelect className="navBar" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {" "}
          Mascotas Perdidas
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link as={Link} to="/iniciarSesion">
              Inicia Sesión
            </Nav.Link>
            <Nav.Link as={Link} to="/registro">
              Regístrate
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
