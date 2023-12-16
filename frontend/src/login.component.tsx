import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "./styles.css";

type SetIsLoggedInType = (value: boolean) => void;

interface LoginProps {
  setIsLoggedIn: SetIsLoggedInType;
}

function Login({ setIsLoggedIn }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = () => {
    const requestData = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:8080/login", requestData)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("username", requestData.username);
          localStorage.setItem("token", response.data);
          setIsLoggedIn(true);
        } else {
          setErrorMessage("Login failed.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setErrorMessage("Error during login. Please try again.");
      });
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Login</h2>
          {errorMessage && <Alert variant="danger" className="error-message">{errorMessage}</Alert>}
          <Form className="login-form">
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
