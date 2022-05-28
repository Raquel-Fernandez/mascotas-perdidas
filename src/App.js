import "./App.css";
import MascotasCard from "./components/MascotasCard";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
} from "react-bootstrap/";
import "./components/MascotasCard.css";

function App() {

  document.title = "Mascotas Perdidas";
  return (
   
    <div className="container">
     
      <>
        <Navbar className="navBar" fixed="top" expand="lg">
          <Container>
            <Navbar.Brand href="/">Mascotas Perdidas</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end" style={{ width: "100%" }}>
                <Nav.Link href="iniciarSesion">Inicia Sesión</Nav.Link>
                <Nav.Link href="#registro">Regístrate</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>

      <p>Mascotas perdidas</p>
      <MascotasCard></MascotasCard>
    </div>
  );
}

export default App;
