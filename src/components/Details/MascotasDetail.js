import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap/";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function MascotasDetail() {
  const id = useParams();
  const mascotaId = id.keyword;

  const docRef = doc(db, "mascotas", mascotaId);
  const [loading, setLoading] = useState(true);
  const [mascota, setMascota] = useState("");

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      const mascotaData = doc.data();
      setMascota(mascotaData);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col
            md={6}
            classNameName="text-center"
            style={{ marginTop: "5%", marginBottom: "2%" }}
          >
            <Image
              fluid
              alt="Mascota"
              src={mascota.url}
              classNameName="img-responsive"
            />
          </Col>
          <Col md={12} style={{ marginTop: "2%", marginBottom: "2%" }}>
            <dl className="row">
              <dt className="col-sm-3">Nombre</dt>

              <dd className="col-sm-9">{mascota.nombre}</dd>
              {mascota.tipoMascota && mascota.tipoMascota.lenght > 0 ? (
                <>
                  <dt className="col-sm-3 float-end">Tipo de mascota</dt>
                  <dd className="col-sm-9">{mascota.tipoMascota}</dd>
                </>
              ) : (
                ""
              )}

              {mascota.raza && mascota.raza.length > 0 ? (
                <>
                  <dt className="col-sm-3">Raza</dt>
                  <dd className="col-sm-9">{mascota.raza}</dd>
                </>
              ) : (
                ""
              )}
              {mascota.edad && mascota.edad.length > 0 ? (
                <>
                  <dt className="col-sm-3 text-truncate">Edad</dt>
                  <dd className="col-sm-9">{mascota.edad}</dd>
                </>
              ) : (
                ""
              )}
              {mascota.sexo && mascota.sexo.length > 0 ? (
                <>
                  <dt className="col-sm-3 text-truncate">Sexo</dt>
                  <dd className="col-sm-9">{mascota.sexo}</dd>
                </>
              ) : (
                ""
              )}
              {mascota.lugar && mascota.lugar.length > 0 ? (
                <>
                  <dt className="col-sm-3">Lugar</dt>
                  <dd className="col-sm-9">{mascota.lugar}</dd>
                </>
              ) : (
                ""
              )}
              {mascota.zona && mascota.zona.length > 0 ? (
                <>
                  <dt className="col-sm-3">Zona</dt>
                  <dd className="col-sm-9">{mascota.zona}</dd>
                </>
              ) : (
                ""
              )}
              <dt className="col-sm-3">Fecha extravío</dt>
              <dd className="col-sm-9">{mascota.fechaExtravio}</dd>
              <dt className="col-sm-3">Teléfono</dt>
              <dd className="col-sm-9">{mascota.telefono}</dd>
              {mascota.email && mascota.email.length > 0 ? (
                <>
                  <dt className="col-sm-3">Email</dt>
                  <dd className="col-sm-9">{mascota.email}</dd>
                </>
              ) : (
                ""
              )}
            </dl>
          </Col>
          {mascota.comentario && mascota.comentario.length > 0 ? (
            <Col md={12}>
              <dl className="row">
                <dt className="col-sm-12">Comentarios</dt>
                <dd className="col-sm-12">{mascota.comentario}</dd>
              </dl>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Container>
    </>
  );
}
