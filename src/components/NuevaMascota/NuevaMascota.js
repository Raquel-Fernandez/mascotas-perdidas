import React, { useEffect } from "react";
import { Form, Button, Col, Row, Image } from "react-bootstrap/";
import { useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase-config";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

function NuevaMascota({ isLoggedIn }) {
  const [nombre, setNombre] = useState("");
  const [tipoMascota, setTipoMascota] = useState("");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState();
  const [edad, setEdad] = useState("");
  const [lugar, setLugar] = useState();
  const [zona, setZona] = useState("");
  const [fechaExtravio, setFechaExtravio] = useState([]);
  const [telefono, setTelefono] = useState();
  const [email, setEmail] = useState("");
  const [comentario, setComentario] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [validated, setValidated] = useState(false);
  const imagesListRef = ref(storage, "images/");
  const uploadFile = (e) => {
    e.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, [imagesListRef]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
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

  const postsCollectionRef = collection(db, "mascotas");
  let navigate = useNavigate();


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    createPost()
  };



  const createPost = async (e) => {
    e.preventDefault();
    await addDoc(postsCollectionRef, {
      nombre,
      tipoMascota,
      raza,
      edad,
      lugar,
      zona,
      fechaExtravio,
      telefono,
      email,
      comentario,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
          required
          type="text"
            placeholder="Nombre de la mascota"
            onChange={(event) => setNombre(event.target.value)}
            
          />
           <Form.Control.Feedback type="invalid">
              Introduce el nombre de tu mascota
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAddress2">
          <Form.Label>Tipo de Mascota</Form.Label>
          <Form.Control
            placeholder="Tipo de mascota"
            onChange={(event) => setTipoMascota(event.target.value)}
          required
          />
          <Form.Control.Feedback type="invalid">
              Introduce el tipo de mascota (Perro, gato, pájaro...)
            </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Raza</Form.Label>
          <Form.Control onChange={(event) => setRaza(event.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Edad</Form.Label>
          <Form.Control onChange={(event) => setEdad(event.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Sexo</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Selecciona el sexo de tu mascota</option>

            <option value="1">Macho</option>
            <option value="2">Hembra</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAddress4">
          <Form.Label>Lugar</Form.Label>
          <Form.Control
            placeholder="Nombre de la mascota"
            onChange={(event) => setLugar(event.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
              Introduce el lugar
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAddress5">
          <Form.Label>Zona</Form.Label>
          <Form.Control
            placeholder="Nombre de la mascota"
            onChange={(event) => setZona(event.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAddress6">
          <Form.Label>Fecha de extravío</Form.Label>
          <Form.Control
          type="date"
            placeholder="Fecha de extravío"
            required
            onChange={(event) => setFechaExtravio(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
          Introduce una fecha
        </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAddress7">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
          type="number"
            placeholder="Teléfono de contacto"
            onChange={(event) => setTelefono(event.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
              Introduce el teléfono de contacto
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAddress8">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
          type="email"
            placeholder="Correo electrónico"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Comentarios</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(event) => setComentario(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Seleccionar archivo</Form.Label>
        <Form.Control type="file" onChange={onSelectFile} />
        {selectedFile && <Image src={preview} alt={"Archivo"} fluid />}
      </Form.Group>
      <Button variant="primary" type="submit">
        Crear
      </Button>
    </Form>
  );
}
export default NuevaMascota;
