import React from "react";
import { Button } from "react-bootstrap/";
import { BrowserRouter as Link } from "react-router-dom";
import "./ButtonDetail.css";

const ButtonDetail = () => {
  return (
    <Button as={Link} to="/detail" className={"buttonDetail"}>
      Ver más detalles
    </Button>
  );
};

export default ButtonDetail;
