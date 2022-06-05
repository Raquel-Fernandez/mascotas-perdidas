import { Navbar, Container, Nav } from "react-bootstrap/";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

import React from "react";
import { useState } from "react";
import { auth } from "../../firebase-config";
import Login from "../login/Login";
import "./NavBar.css";

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const [modalShow, setModalShow] = useState(false);

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
        <Navbar.Brand className="harlow" as={Link} to="/">
          Mascotas Perdidas
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {isLoggedIn ? (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <Nav.Link as={Link} to="/myPosts" eventKey="/myPosts">
                Mis publicaciones
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/logout"
                eventKey="/logout"
                onClick={userSingOut}
              >
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
              <Nav.Link onClick={() => setModalShow(true)}>
                Iniciar sesión
              </Nav.Link>
              <Login
                modalShow={modalShow}
                setModalShow={setModalShow}
                setIsLoggedIn={setIsLoggedIn}
              ></Login>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
