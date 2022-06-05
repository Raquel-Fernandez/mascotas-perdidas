import React, { useEffect } from "react";
import { Form, Button, Col, Row, Image, Toast } from "react-bootstrap/";
import { useState } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

function NuevaPublicacion({ isLoggedIn }) {
  const [nombre, setNombre] = useState("");
  const [tipoMascota, setTipoMascota] = useState("");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("Macho");
  const [edad, setEdad] = useState("");
  const [lugar, setLugar] = useState("");
  const [zona, setZona] = useState("");
  const [fechaExtravio, setFechaExtravio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [comentario, setComentario] = useState("");
  const [validated, setValidated] = useState(false);
  const [preview, setPreview] = useState();

  const [selectedFile, setSelectedFile] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "images/");

  const postsCollectionRef = collection(db, "mascotas");
  let navigate = useNavigate();

  const [timeNow, setTimeNow] = useState(Date.now());
  const [show, setShow] = useState(false);

  let today = new Date().toLocaleDateString();
  today = today.replaceAll("/", "-");

  const convertToDate = (d) => {
    const [day, month, year] = d.split("-");
    return new Date(year, month - 1, day);
  };

  const createPost = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);

    e.preventDefault();

    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(postsCollectionRef, {
          nombre,
          tipoMascota,
          raza,
          edad,
          lugar,
          zona,
          fechaExtravio,
          telefono,
          email,
          sexo,
          comentario,
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
          },
          url: url,
          timeNow,
        });
        setImageUrls((prev) => [...prev, url]);
      });
    });

    setShow(true);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/iniciarSesion");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setImageUpload(e.target.files[0]);
  };

  return (
    <Form
      style={{ marginTop: "5%", marginBottom: "2%" }}
      noValidate
      onSubmit={createPost}
    >
      <Row>
        <Form.Group
          className="mb-4"
          xs={12}
          sm={6}
          as={Col}
          controlId="formGridAddress1"
        >
          <Form.Label>
            Nombre<span style={{ color: "red" }}> *</span>
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nombre de la mascota"
            onChange={(event) => setNombre(event.target.value)}
            isInvalid={!(nombre.length > 0) && (nombre.length || validated)}
          />
          <Form.Control.Feedback type="invalid">
            Introduce el nombre de tu mascota
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="mb-4"
          as={Col}
          xs={12}
          sm={6}
          controlId="formGridAddress2"
        >
          <Form.Label>
            Tipo de Mascota<span style={{ color: "red" }}> *</span>
          </Form.Label>
          <Form.Control
            placeholder="Tipo de mascota"
            onChange={(event) => setTipoMascota(event.target.value)}
            required
            isInvalid={
              !(tipoMascota.length > 0) && (tipoMascota.length || validated)
            }
          />
          <Form.Control.Feedback type="invalid">
            Introduce el tipo de mascota (Perro, gato, pájaro...)
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-4" as={Col} controlId="formGridCity">
          <Form.Label>Raza</Form.Label>
          <Form.Control
            placeholder="Raza"
            onChange={(event) => setRaza(event.target.value)}
          />
        </Form.Group>

        <Form.Group
          className="mb-4"
          xs={12}
          sm={4}
          as={Col}
          controlId="formGridState"
        >
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            isInvalid={!(edad.length < 2) && validated}
            placeholder="Edad"
            onChange={(event) => setEdad(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            La edad debe de estar entre 0 y 99
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="mb-4"
          xs={12}
          sm={4}
          as={Col}
          controlId="formGridZip"
        >
          <Form.Label>Sexo</Form.Label>
          <Form.Control
            as="select"
            value={sexo}
            onChange={(e) => {
              setSexo(e.target.value);
            }}
          >
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </Form.Control>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group
          className="mb-4"
          xs={12}
          sm={4}
          as={Col}
          controlId="formGridAddress4"
        >
          <Form.Label>
            Lugar<span style={{ color: "red" }}> *</span>
          </Form.Label>
          <Form.Control
            placeholder="Lugar"
            onChange={(event) => setLugar(event.target.value)}
            required
            isInvalid={!(lugar.length > 0) && (lugar.length || validated)}
          />
          <Form.Control.Feedback type="invalid">
            Introduce el lugar
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          className="mb-4"
          xs={12}
          sm={4}
          as={Col}
          controlId="formGridAddress5"
        >
          <Form.Label>Zona</Form.Label>
          <Form.Control
            placeholder="Zona"
            onChange={(event) => setZona(event.target.value)}
          />
        </Form.Group>
        <Form.Group
          className="mb-4"
          xs={12}
          sm={4}
          as={Col}
          controlId="formGridAddress6"
        >
          <Form.Label>
            Fecha de extravío<span style={{ color: "red" }}> *</span>
          </Form.Label>
          <Form.Control
            type="date"
            placeholder="Fecha de extravío"
            required
            isInvalid={
              !(convertToDate(fechaExtravio) <= convertToDate(today)) &&
              (fechaExtravio.length || validated)
            }
            onChange={(event) => {
              const date = event.target.value.split("-").reverse().join("-");
              setFechaExtravio(date);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Introduce una fecha
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group
          className="mb-4"
          as={Col}
          xs={12}
          sm={6}
          controlId="formGridAddress7"
        >
          <Form.Label>
            Teléfono<span style={{ color: "red" }}> *</span>
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Teléfono de contacto"
            onChange={(event) => setTelefono(event.target.value)}
            isInvalid={
              !(telefono.length === 9) && (telefono.length || validated)
            }
            required
          />

          <Form.Control.Feedback type="invalid">
            Introduce el teléfono de contacto (9 dígitos)
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="mb-4"
          as={Col}
          xs={12}
          sm={6}
          controlId="formGridAddress8"
        >
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Correo electrónico"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group
          className="mb-4"
          as={Col}
          xs={12}
          sm={12}
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Comentarios</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(event) => setComentario(event.target.value)}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group controlId="formFile" className="mb-4">
          <Form.Label>
            Seleccionar archivo<span style={{ color: "red" }}> *</span>
          </Form.Label>
          <Form.Control
            type="file"
            isInvalid={
              !(selectedFile != "") && (selectedFile.length || validated)
            }
            required
            onChange={onSelectFile}
          />
          {selectedFile && <Image src={preview} alt={"Archivo"} fluid />}
          <Form.Control.Feedback type="invalid">
            Añade una foto
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Col xs={6}>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header position="middle-end">
              <strong className="me-auto">Publicación</strong>
            </Toast.Header>
            <Toast.Body>¡La publicación fue creada con éxito!</Toast.Body>
          </Toast>
        </Col>
        <Col xs={6}>
          <Button
            type="submit"
            style={{ backgroundColor: "#c7a987", border: "1px solid #c7a987" }}
          >
            Crear
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
export default NuevaPublicacion;
