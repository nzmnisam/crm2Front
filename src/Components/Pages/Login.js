import React, { useState } from "react";
import { useHistory } from "react-router";
import { Form, Button } from "react-bootstrap";
import "../../styles/Login.css";

function Login({ api, setRole }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    api
      .post(`/staff/login`, { email, password })
      .then((res) => {
        if (res.data.status === 1) {
          window.localStorage.setItem("api_token", res.data.api_token);
          window.localStorage.setItem("role", res.data.role);
          window.localStorage.setItem("staff_id", res.data.id);
          setRole(res.data.role);
          history.push("/Dashboard");
        } else {
          alert("This account isn't active.");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="login-container">
      <h5>Staff Login</h5>
      <div className="form-container">
        <Form>
          <div className="input-container">
            <p>Email:</p>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <p>Password:</p>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button type="submit" onClick={onSubmit}>
            Login
          </Button>
        </Form>
        <hr></hr>
      </div>
    </div>
  );
}

export default Login;
