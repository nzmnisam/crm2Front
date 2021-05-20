import React, { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import "../../styles/Page.css";
import "../../styles/EditContact.css";

import { Form, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router";

const EditCompany = ({ api, cities, setRefresh }) => {
  const history = useHistory();
  const { id } = useParams();

  const [company, setCompany] = useState();
  const [companyName, setCompanyName] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [website_url, setWebsiteUrl] = useState();
  const [city_id, setCity] = useState();

  useEffect(() => {
    const apiToken = window.localStorage.getItem("api_token");
    api
      .get(`/companies/${id}`, { headers: { token: apiToken } })
      .then((res) => {
        console.log(res.data);
        if (!isEqual(res.data, company)) {
          fillForm(res.data);
          setCompany(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          return alert("Company with this ID doesn't exist");
        }
        console.log(error.response.data.message);
      });
  }, [api, company, id]);

  const fillForm = (data) => {
    setCompanyName(data.company);
    setAddress(data.address);
    setAddress2(data.address2);
    setCity(data.city_id);
    setWebsiteUrl(data.website_url);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const apiToken = window.localStorage.getItem("api_token");
    api
      .put(
        `/companies/${id}`,
        {
          company: companyName,
          address,
          address2,
          city_id,
          website_url,
        },
        { headers: { token: apiToken } }
      )
      .then((res) => {
        console.log(res.data);
        setRefresh(true);
        alert("Company successfully updated");
        history.push("/Companies");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const onDelete = (e) => {
    e.preventDefault();
    const apiToken = window.localStorage.getItem("api_token");

    if (window.confirm("Are you sure you want to delete the company?")) {
      api
        .delete(`companies/${id}`, { headers: { token: apiToken } })
        .then((res) => {
          setRefresh(true);
          alert("Lead deleted");
          history.push("/Dashboard");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  return (
    <div className="container">
      <h5>Company details: </h5>
      <hr />
      <div className="input-container">
        <p>Company:</p>
        <Form.Control
          id="company-field"
          type="text"
          name="companyName"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
      </div>
      <div className="input-container">
        <p>Address:</p>
        <Form.Control
          type="text"
          name="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>
      <div className="input-container">
        <p>Address 2:</p>
        <Form.Control
          type="text"
          name="address2"
          value={address2}
          onChange={(e) => {
            setAddress2(e.target.value);
          }}
        />
      </div>
      <div className="input-container">
        <p>City:</p>
        <Form.Control
          as="select"
          name="city"
          value={city_id}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        >
          <option value="">Select city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city}
            </option>
          ))}
        </Form.Control>
      </div>
      <div className="input-container">
        <p>Website url:</p>
        <Form.Control
          type="text"
          name="website-url"
          value={website_url}
          onChange={(e) => {
            setWebsiteUrl(e.target.value);
          }}
        />
      </div>
      <Button type="submit" onClick={onSubmit} className="accept-button">
        Accept
      </Button>
      <Button type="submit" onClick={onDelete} className="delete-button">
        Delete
      </Button>
      <hr />
    </div>
  );
};

export default EditCompany;
