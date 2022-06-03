import React from "react";
import "./MascotasCard.css";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Image } from "react-bootstrap/";
import { useEffect, useState } from "react";

 
  export default function MascotasCard({mascotas}) {
    
    console.log(mascotas, "mascotasCard");
  
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
                <button
                      type="button"
                      class="btn btn-outline-danger"
                     
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        ></path>
                      </svg>
                      Eliminar
                    </button>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
