import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router";
import "../../styles/Page.css";
import "../../styles/EditContact.css";

import isEqual from "lodash.isequal";
import { Form, Button } from "react-bootstrap";
import { DateTime } from "luxon";

const EditContact = ({
  api,
  setContacts,
  contacts,
  stages,
  cities,
  companies,
  setCompanies,
  setCities,
  refresh,
  setRefresh,
}) => {
  const [staff_id, setStaff_id] = useState(localStorage.getItem("staff_id"));
  const history = useHistory();
  const [contact, setContact] = useState();
  const { id } = useParams();

  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [title, setTitle] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [contact_method, setContactMethod] = useState();

  const [companyId, setCompanyId] = useState();
  const [company, setCompany] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [website_url, setWebsiteUrl] = useState();

  const [stage_id, setStage] = useState();
  const [city_id, setCity] = useState();
  const [deal_size, setDealSize] = useState();
  const [follow_up_date, setFollowUpDate] = useState();
  const [notes, setNotes] = useState();

  let addedUpdatedCompany;

  const fetchData = useCallback(() => {
    const apiToken = window.localStorage.getItem("api_token");
    api
      .get(`/contacts/detailed/${id}`, { headers: { token: apiToken } })
      .then((res) => {
        console.log(res);
        if (!isEqual(res.data[0], contact)) {
          setContact(res.data[0]);
          fillForm(res.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          return alert("Lead with this ID doesn't exist");
        }
        console.log(error.response.data.message);
      });
  }, [api, contact, id]);

  function updateContacts(
    firstName,
    lastName,
    titlE,
    dealSize,
    followUpDate,
    phonE,
    emaiL,
    contactMethod,
    noteS,
    companyID,
    stageId
  ) {
    const apiToken = window.localStorage.getItem("api_token");
    api
      .put(
        `/contacts/${id}`,
        {
          first_name: firstName,
          last_name: lastName,
          title: titlE,
          deal_size: dealSize,
          follow_up_date: followUpDate,
          phone: phonE,
          email: emaiL,
          contact_method: contactMethod,
          notes: noteS,
          company_id: companyID,
          stage_id: stageId,
        },
        { headers: { token: apiToken } }
      )
      .then((res) => {
        console.log(res.data);
        setRefresh(true);
        //setCompanies(...companies, addedUpdatedCompany);
        alert("Lead successfully updated");
        history.push("/Dashboard");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fillForm = (data) => {
    //console.log(data);
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setTitle(data.title);
    setPhone(data.phone);
    setEmail(data.email);
    setContactMethod(data.contact_method);

    setCompanyId(data.company_id);

    setStage(data.stage_id);
    setDealSize(data.deal_size);

    setFollowUpDate(data.follow_up_date);
    setNotes(data.notes);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //apdejtovanje kontakta
    updateContacts(
      first_name,
      last_name,
      title,
      deal_size,
      follow_up_date,
      phone,
      email,
      contact_method,
      notes,
      companyId,
      stage_id
    );
  };

  const onDelete = (e) => {
    e.preventDefault();
    const apiToken = window.localStorage.getItem("api_token");
    if (window.confirm("Are you sure you want to delete a lead?")) {
      api
        .delete(`contacts/${id}`, { headers: { token: apiToken } })
        .then((res) => {
          // setContact({});
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
      <h5>Edit Lead:</h5>
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
            <Button type="submit" onClick={onDelete} className="delete-button">
              Delete
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditContact;
