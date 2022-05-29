import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap/";
import mascotasPerdidas from "../../mock/Mascotas";
import { useParams } from "react-router-dom";

export default function MascotasDetail() {
  const id = useParams();
  const mascotaId = id.keyword;

  let mascota = mascotasPerdidas.find((mascota) => {
    return mascota.id == mascotaId;
  });

  return (
    <Container>
      <Row>
        <Col md={6} style={{ marginTop: "2%", marginBottom: "2%" }}>
          <Image fluid alt="Perro1" src={mascota.image} />
        </Col>
        <Col md={6} style={{ marginTop: "2%", marginBottom: "2%" }}>
          {mascota.name}
        </Col>
      </Row>
    </Container>
  );
}
