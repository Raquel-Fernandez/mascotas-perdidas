import React from "react";
import { Form, Button } from "react-bootstrap/";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(userMail) => setEmail(userMail)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(userPassword) => setPassword(userPassword)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button
        style={{ backgroundColor: "#C7A987", border: "#C7A987" }}
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
}

export default Register;
