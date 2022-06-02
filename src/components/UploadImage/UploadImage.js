import React, { useEffect, useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase-config";
import { v4 } from "uuid";
import { Form, Button, Col, Row, Image } from "react-bootstrap/";

export default function UploadImage() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  

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

  return (
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Seleccionar archivo</Form.Label>
      <Form.Control type="file" onChange={onSelectFile} />
      {selectedFile && <Image src={preview} alt={"Archivo"} fluid />}
    </Form.Group>
    
  );
}
