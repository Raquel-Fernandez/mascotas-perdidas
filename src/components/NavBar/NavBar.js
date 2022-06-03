import { Navbar, Container, Nav } from "react-bootstrap/";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  
  const userSingOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsLoggedIn(false);
      window.location.pathname = "/";
    });
  };

  return (
    <Navbar collapseOnSelect className="navBar" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Mascotas Perdidas
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {isLoggedIn ? (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <Nav.Link as={Link} to="/logout" eventKey="/logout" onClick={userSingOut}>
                Cerrar Sesión
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link as={Link} to="/myPosts" eventKey="/myPosts">
                Mis publicaciones
              </Nav.Link>
              <Nav.Link as={Link} to="/iniciarSesion" eventKey="/iniciarSesion">
                Inicia Sesión
              </Nav.Link>

              <Nav.Link as={Link} to="/registro" eventKey="/registro">
                Regístrate
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
