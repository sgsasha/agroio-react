import "./LoginPage.css";
import logo from '../../logo.png';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import { login } from "../../store/actions";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const [value, setValue] = useState({
    email: "",
    password: ""
  });
  const loginError = useSelector(state => state.accountReducer.error);

  function onLoginClick() {
    login(value);
  }

  function handleOnChange(e) {
    e.persist();
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  }

  function isEmailInvalid (email) {
    // todo: dirty/touched
    if (!email) {
      return false;
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase());
  }

  return (
    <div className="login-page">
      <Card className="login-card">
        <Card.Body>
          <div className="d-flex align-content-center justify-content-center">
            <img src={logo} />
          </div>
          <div className="d-flex align-content-center justify-content-center mt-3">
            <h2>Log in</h2>
          </div>
          <Form className="login-form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={value.email}
                onChange={handleOnChange}/>
            </Form.Group>
            { isEmailInvalid(value.email) ? <div className="form-error mb-2">Email must be valid</div>: null }
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={value.password}
                onChange={handleOnChange}/>
            </Form.Group>
            { loginError ? <div className="form-error mb-2">{loginError}</div>: null }
            <Button variant="primary" block onClick={onLoginClick}>
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};


LoginPage.propTypes = {};

LoginPage.defaultProps = {};

export default LoginPage;
