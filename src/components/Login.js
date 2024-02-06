import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Row,
  Col,
  Input,
  CardHeader,
  CardImg,
  CardBody,
  CardTitle,
  CardFooter,
} from "reactstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history("/inventory");
    } catch (error) {
      console.log(error)
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <Card 
                  style={{background: "#212124"}}
                  className="card-register">
                    <CardHeader>
                      <CardTitle tag="h3">Login</CardTitle>
                    </CardHeader>
                    <CardBody style={{background: "#212124"}}>
                      {error && (
                        <Alert
                          variant="danger"
                          style={{ backgroundColor: "red" }}
                        >
                          {error}
                        </Alert>
                      )}
                      <Form className="form" onSubmit={handleSubmit}>
                        <Input style={{borderColor:"#FFFFFF"}}
                          innerRef={emailRef}
                          placeholder="Email"
                          type="text"
                        />
                        <Input
                          style={{ marginTop: "1rem", borderColor:"#FFFFFF" }}
                          innerRef={passwordRef}
                          placeholder="Password"
                          type="password"
                        />
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        disabled={loading}
                        className="btn-wrapper"
                        color="success"
                        size="lg"
                        onClick={handleSubmit}
                      >
                        Login
                      </Button>
                    </CardFooter>
                  </Card>
                  {/* <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Label>Email</Label>
                <Input type="email" ref={emailRef} required />
           
                <Label>Password</Label>
                <Input type="password" ref={passwordRef} required />
           
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card> */}
                  <div className="text-center">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                  <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/register">Sign Up</Link>
                  </div>
                </Col>
                <Col>
                  <img
                    width={"60%"}
                    style={{ float: "right" }}
                    alt="..."
                    className="img-fluid"
                    src={require("../assets/img/Tree.png")}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
