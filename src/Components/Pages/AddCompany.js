import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AddCompany = ({ cities, setRefresh, api }) => {
  const history = useHistory();

  const [company, setCompany] = useState();
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [website_url, setWebsiteUrl] = useState("");
  const [city_id, setCity] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const apiToken = window.localStorage.getItem("api_token");
    const staff_id = window.localStorage.getItem("staff_id");
    api
      .post(
        `/companies`,
        {
          company: companyName,
          address,
          address2,
          website_url,
          city_id,
          staff_id,
        },
        { headers: { token: apiToken } }
      )
      .then((res) => {
        setRefresh(true);
        alert("Company Successfully Added");
        history.push("/Companies");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
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
        Add Company
      </Button>
    </div>
  );
};

export default AddCompany;
