import React, { useEffect, useState } from "react";
import "./MascotasCard.css";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Image } from "react-bootstrap/";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import Login from "../login/Login";

export default function MascotasCard({
  isLoggedIn,
  mascotas,
  setMascotas,
  loading,
  isMyProfile,
  setIsLoggedIn,
}) {
  const [isLoading, setIsLoading] = useState(loading);

  const [modalShow, setModalShow] = useState(false);
  const getPost = async () => {
    const postsCollectionRef = collection(db, "mascotas");
    const postsOrdered = query(postsCollectionRef, orderBy("timeNow", "desc"));

    const data = await getDocs(postsOrdered);
    setMascotas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getPost();
  }, []);

  const deletePost = async (id) => {
    const postsCollectionRef = collection(db, "mascotas");
    const postsOrdered = query(postsCollectionRef, orderBy("timeNow", "desc"));
    
    const postDoc = doc(db, "mascotas", id);
    await deleteDoc(postDoc);

    if (isMyProfile) {
      const data = await getDocs(postsOrdered);
      const dataList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      let myData = dataList.filter(
        (row) => row.author.id == auth.currentUser.uid
      );
      setMascotas(myData);
    } else {
      const data = await getDocs(postsOrdered);
      setMascotas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  return (
    <>
      <Row sm={12}>
        {mascotas.map((post) => {
          return (
            <>
              <Col
                xs={12}
                sm={4}
                style={{ marginTop: "5%", marginBottom: "2%", display: "flex" }}
                key={post.id}
              >
                <Card class="card h-100">
                  <Card.Img as={Image} variant="top" src={post.url} />

                  <Card.ImgOverlay style={{ zIndex: "1" }}>
                    <Card.Title>
                      {isLoggedIn && post.author.id === auth.currentUser.uid && (
                        <button
                          type="button"
                          class="btn btn-danger float-end"
                          onClick={() => {
                            deletePost(post.id);
                          }}
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
                        </button>
                      )}
                    </Card.Title>
                  </Card.ImgOverlay>
                  <Card.Body>
                    <Card.Title>{post.nombre}</Card.Title>
                    <Card.Text>
                      Mascota perdida en {post.lugar} a fecha de{" "}
                      {post.fechaExtravio}. Teléfono: {post.telefono}
                    </Card.Text>
                  </Card.Body>

                  <Button
                    as={Link}
                    to={`/detail/${post.id}`}
                    style={{
                      backgroundColor: "#C7A987",
                      border: "#C7A987",
                      hover: "border: 2px solid red",
                      zIndex: "2",
                    }}
                  >
                    Ver más detalles
                  </Button>
                </Card>
              </Col>
            </>
          );
        })}
      </Row>

      {!isLoggedIn ? (
        <>
          <button className="addPets" onClick={() => setModalShow(true)}>
            {" "}
            +{" "}
          </button>
          <Login
            modalShow={modalShow}
            setModalShow={setModalShow}
            setIsLoggedIn={setIsLoggedIn}
          ></Login>
        </>
      ) : (
        <Link to="/nuevaPublicacion" className="addPets">
          +
        </Link>
      )}
    </>
  );
}
