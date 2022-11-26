import "./Login.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

function Login() {
  return (
    <Form align="center" className="login-form">
      <Container>
        <center>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            variant="dark"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="email-inp"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="pswd-inp"
            />
          </Form.Group>
        </center>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Container>
    </Form>
  );
}

export default Login;
