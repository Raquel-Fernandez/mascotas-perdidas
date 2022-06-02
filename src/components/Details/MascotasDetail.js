import React, {useEffect, useState} from "react";
import { Container, Row, Col, Image } from "react-bootstrap/";
import mascotasPerdidas from "../../mock/Mascotas";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, query, getDoc } from 'firebase/firestore';
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { storage } from "../../firebase-config";

export default function MascotasDetail({}) {
   
  const id = useParams();
  const mascotaId = id.keyword;
  
 const docRef = doc(db, 'mascotas', mascotaId)
 const [loading, setLoading] = useState(true)
 const [mascota, setMascota] = useState("")


useEffect(() => {
  onSnapshot(docRef, (doc) => {
    const mascotaData = doc.data()
    setMascota(mascotaData)
    setLoading(false)
  })
}, []);
  
  return (
  
  <>    {!loading ? (
    <Container>
      <Row>
        <Col md={6} style={{ marginTop: "2%", marginBottom: "2%" }}>
          <Image fluid alt="Perro1"  />
        </Col>
        <Col md={6} style={{ marginTop: "2%", marginBottom: "2%" }}>
          {mascota.nombre}
         
        </Col>
      </Row>
    </Container>
    ) : (<h1>Estoy cargando</h1>)
    }
    </>

  );

}
