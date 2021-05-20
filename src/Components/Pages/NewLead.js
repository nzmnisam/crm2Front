import React, { useState } from "react";
import { useHistory } from "react-router";
import "../../styles/Page.css";
import "../../styles/EditContact.css";

import { Form, Button } from "react-bootstrap";

const NewLead = ({
  api,
  stages,
  setRefresh,
  cities,
  setCities,
  companies,
  setCompanies,
}) => {
  const [staff_id, setStaff_id] = useState(localStorage.getItem("staff_id"));
  const history = useHistory();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contact_method, setContactMethod] = useState("");

  const [company, setCompany] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [website_url, setWebsiteUrl] = useState("");

  const [stage_id, setStage] = useState("");
  const [city_id, setCity] = useState("");
  const [deal_size, setDealSize] = useState("");
  const [follow_up_date, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");

  let addedUpdatedCompany;

  const onAddUpdateCompany = (e) => {
    e.preventDefault();
    const apiToken = window.localStorage.getItem("api_token");

    let update = false;
    //ako kompanija nije nadjena napravi novu
    api
      .post(
        `/companies`,
        {
          company,
          address,
          address2,
          website_url,
          city_id,
          staff_id,
        },
        { headers: { token: apiToken } }
      )
      .then((response) => {
        //apdejtuj state kompanija
        addedUpdatedCompany = response.data;
        const newCompanyId = response.data.id;
        //postavi company_id kontakta na novi company_id
        setCompanyId(newCompanyId);
        //postavi ostala polja na nove atribute kompanije
        setCompany(response.data.company);
        setAddress(response.data.address);
        setAddress2(response.data.address2);
        setCity(response.data.city_id);
        setWebsiteUrl(response.data.website_url);
        alert("New Company Added");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });

    //nakon ili ako ne dodje do setovanja druge kompanije apdejtuj postojecu ili novu
    // api
    //   .put(
    //     `/companies/${companyId}`,
    //     {
    //       address,
    //       address2,
    //       city_id,
    //       website_url,
    //     },
    //     { headers: { token: apiToken } }
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     alert("Company Updated");
    //   })
    //   .catch((error) => console.log(error));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const apiToken = window.localStorage.getItem("api_token");
    const staff_id = window.localStorage.getItem("staff_id");
    api
      .post(
        `/contacts`,
        {
          first_name,
          last_name,
          title,
          phone,
          email,
          contact_method,
          company_id: companyId,
          stage_id,
          deal_size,
          follow_up_date,
          notes,
          staff_id,
        },
        { headers: { token: apiToken } }
      )
      .then((res) => {
        setRefresh(true);
        alert("Lead successfully added");
        history.push("/Dashboard");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="container">
      <h5>New Lead:</h5>
      <div className="form-container">
        <Form>
          <hr />
          <div className="input-container">
            <p>First name:</p>
            <Form.Control
              type="text"
              name="first-name"
              value={first_name}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <p>Last name:</p>
            <Form.Control
              type="text"
              name="last-name"
              value={last_name}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <p>Title:</p>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <p>Phone:</p>
            <Form.Control
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
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
            <p>Contact method:</p>
            <Form.Control
              as="select"
              name="contact-method"
              value={contact_method}
              onChange={(e) => {
                setContactMethod(e.target.value);
              }}
            >
              <option value="">Select contact method</option>
              <option value="phone">Phone</option>
              <option value="email">Email</option>
            </Form.Control>
          </div>

          <hr />
          <div className="input-container">
            <p>Stage:</p>
            <Form.Control
              as="select"
              name="stage"
              value={stage_id}
              onChange={(e) => {
                setStage(e.target.value);
              }}
            >
              <option value="">Select a stage</option>
              {stages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.stage}
                </option>
              ))}
            </Form.Control>
          </div>
          <div className="input-container">
            <p>Deal size:</p>
            <Form.Control
              type="text"
              name="deal-size"
              value={deal_size}
              onChange={(e) => {
                setDealSize(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <p>Follow Up Date:</p>
            <Form.Control
              type="date"
              name="follow-up-date"
              value={follow_up_date}
              onChange={(e) => {
                setFollowUpDate(e.target.value);
              }}
            />
          </div>

          <div className="input-container">
            <p>Company:</p>
            <Form.Control
              as="select"
              name="company"
              value={companyId}
              onChange={(e) => {
                setCompanyId(e.target.value);
              }}
            >
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.company}
                </option>
              ))}
            </Form.Control>
          </div>

          <div className="input-container notes-textarea">
            <p>Notes:</p>
            <Form.Control
              as="textarea"
              name="notes"
              rows={10}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          </div>

          <div className="buttons">
            <Button type="submit" onClick={onSubmit} className="accept-button">
              Accept
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewLead;
