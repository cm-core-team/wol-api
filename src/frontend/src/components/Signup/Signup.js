import "./Signup.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

function Signup() {
  return (
    <Form align="center">
      <Container>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="email-inp"
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
            className="pswd-inp"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Container>
    </Form>
  );
}

export default Signup;
