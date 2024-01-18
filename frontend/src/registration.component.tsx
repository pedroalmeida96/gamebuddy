import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "./styles.css";

type SetIsLoggedInType = (value: boolean) => void;

interface RegistrationProps {
  setIsLoggedIn: SetIsLoggedInType;
}

function Registration({ setIsLoggedIn }: RegistrationProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegistration = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const requestData = {
      username: username,
      name: username,
      password: password,
    };

    axios
      .post("http://localhost:8080/registration", requestData)
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem("username", requestData.username);
          localStorage.setItem("token", response.data);
          setIsLoggedIn(true);
        } else {
          setErrorMessage("Registration failed.");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        setErrorMessage("Error during registration. Please try again.");
      });
  };

  return (
    <Container className="registration-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Registration</h2>
          {errorMessage && <Alert variant="danger" className="error-message">{errorMessage}</Alert>}
          <Form className="registration-form">
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
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

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleRegistration}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
