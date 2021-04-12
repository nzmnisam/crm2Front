import React, { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import { useParams, useHistory } from "react-router";
import { Form, Button } from "react-bootstrap";

import "../../styles/Page.css";

const ManageEmployee = ({ api, setRefresh }) => {
  const history = useHistory();

  const { id } = useParams();
  const [staffMember, setStaffMember] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const apiToken = window.localStorage.getItem("api_token");
    const role = window.localStorage.getItem("role");
    api
      .get(`/staff/${id}`, { headers: { token: apiToken, role: role } })
      .then((res) => {
        if (!isEqual(res.data, staffMember)) {
          setStaffMember(res.data);
          fillForm(res.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          return alert("Staff member with this ID doesn't exist");
        }
        console.log(error.response.data.message);
      });
  }, [api, staffMember, id]);

  const fillForm = (data) => {
    //console.log(data);
    setName(data.name);
    setEmail(data.email);
    setPassword(data.password);
    setRole(data.role);
    setStatus(data.status);
  };

  const onSubmit = (e) => {
    const apiToken = window.localStorage.getItem("api_token");
    const signedInRole = window.localStorage.getItem("role");

    api
      .put(
        `/staff/${id}`,
        {
          name,
          email,
          password,
          role,
          status,
        },

        { headers: { token: apiToken, role: signedInRole } }
      )
      .then((res) => {
        console.log(res);
        setStaffMember(res.data);
        // console.log(contacts);
        setRefresh(true);
        alert("Staff member successfully updated");
        history.push("/Dashboard");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    e.preventDefault();
    console.log("Submit");
  };

  const onDelete = (e) => {
    e.preventDefault();
    const apiToken = window.localStorage.getItem("api_token");
    const role = window.localStorage.getItem("role");

    if (window.confirm("Are you sure you want to delete staff member?")) {
      api
        .delete(`staff/${id}`, { headers: { token: apiToken, role: role } })
        .then((res) => {
          // setContact({});
          setRefresh(true);
          alert("Staff member deleted");
          history.push("/Dashboard");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  return (
    <div className="container">
      <h5>Staff member details:</h5>
      <div className="form-container">
        <Form>
          <hr />
          <div className="input-container">
            <p>Name:</p>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <p>Email:</p>
            <Form.Control
              type="text"
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
              type="text"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <p>Role:</p>
            <Form.Control
              as="select"
              name="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="sales">Sales</option>
              <option value="manager">Manager</option>
            </Form.Control>
          </div>
          <div className="input-container">
            <p>Status:</p>
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </Form.Control>
          </div>

          <div className="buttons">
            <Button type="submit" onClick={onSubmit} className="accept-button">
              Accept
            </Button>
            <Button type="submit" onClick={onDelete} className="delete-button">
              Delete
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ManageEmployee;
