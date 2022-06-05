import React from "react";
import { Modal } from "react-bootstrap/";
import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./button.css";

function Login({ setIsLoggedIn, modalShow, setModalShow }) {
  const navigateTo = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((user) => {
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
      navigateTo("/");
    });
  };

  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setModalShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Iniciar Sesión
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Iniciar sesión con Google</h4>
        <p>
          Para crear una publicación y/o eliminar una que hayas creado tienes
          que iniciar sesión.
        </p>
        <button
          type="button"
          className="login-with-google-btn"
          onClick={signInWithGoogle}
        >
          Inicia sesión con Google
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
