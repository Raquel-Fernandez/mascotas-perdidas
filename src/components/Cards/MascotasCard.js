import React from "react";
import "./MascotasCard.css";
import { BrowserRouter as Link } from "react-router-dom";
import { Button, Card, Row, Col, Image } from "react-bootstrap/";
import { useEffect, useState } from "react";
import mascotasPerdidas from "../../mock/Mascotas";


export default function MascotasCard() {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    setMascotas(mascotasPerdidas);
  }, []);

  return (
    <Row sm={12}>
      {mascotas.map((mascota) => {
        return (
          <Col
            xs={12}
            sm={4}
            style={{ marginTop: "5%", marginBottom: "2%" }}
            key={mascota.id}
          >
            <Card>
              <Card.Img as={Image} variant="top" src={mascota.image} />
              <Card.Body>
                <Card.Title>{mascota.name}</Card.Title>
                <Card.Text>
                  Mascota perdida en {mascota.lugar} a fecha de {mascota.fecha}
                </Card.Text>
              </Card.Body>
              <Button
                as={Link}
                to={`/detail/${mascota.id}`}
                style={{
                  backgroundColor: "#C7A987",
                  border: "#C7A987",
                  hover: "border: 2px solid red",
                }}
              >
                Ver más detalles
              </Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
