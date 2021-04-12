import React, { useEffect, useState } from "react";
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
  refresh,
  setRefresh,
}) => {
  const history = useHistory();
  const [contact, setContact] = useState();
  const { id } = useParams();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contact_method, setContactMethod] = useState("");

  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [website_url, setWebsiteUrl] = useState("");

  const [stage_id, setStage] = useState("");
  const [deal_size, setDealSize] = useState("");
  const [follow_up_date, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const apiToken = window.localStorage.getItem("api_token");
    api
      .get(`/contacts/${id}`, { headers: { token: apiToken } })
      .then((res) => {
        if (!isEqual(res.data, contact)) {
          setContact(res.data);
          fillForm(res.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          return alert("Lead with this ID doesn't exist");
        }
        console.log(error.response.data.message);
      });
  }, [api, contact, id]);

  const fillForm = (data) => {
    //console.log(data);
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setTitle(data.title);
    setPhone(data.phone);
    setEmail(data.email);
    setContactMethod(data.contact_method);

    setCompany(data.company);
    setAddress(data.address);
    setAddress2(data.address2);
    setCity(data.city);
    setZipCode(data.zip_code);
    setWebsiteUrl(data.website_url);

    setStage(data.stage_id);
    setDealSize(data.deal_size);
    setFollowUpDate(
      DateTime.fromFormat(data.follow_up_date, "yyyy-MM-dd").toFormat(
        "yyyy-MM-dd"
      )
    );
    setNotes(data.notes);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const apiToken = window.localStorage.getItem("api_token");

    api
      .put(
        `/contacts/${id}`,
        {
          first_name,
          last_name,
          title,
          phone,
          email,
          contact_method,
          company,
          address,
          address2,
          city,
          zip_code,
          website_url,
          stage_id,
          deal_size,
          follow_up_date,
          notes,
        },
        { headers: { token: apiToken } }
      )
      .then((res) => {
        console.log(res);
        setContact(res.data);
        console.log(contacts);
        setRefresh(true);
        alert("Lead successfully updated");
        history.push("/Dashboard");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const onDelete = (e) => {
    e.preventDefault();
    const apiToken = window.localStorage.getItem("api_token");
    //  let dialogAnswer = alert("Are you sure you want to delete the lead?");
    //  console.log(dialogAnswer);
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

  // console.log(contact);
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

          <h5>Company details: </h5>
          <hr />
          <div className="input-container">
            <p>Company:</p>
            <Form.Control
              type="text"
              name="company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
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
              type="text"
              name="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <p>Zip code:</p>
            <Form.Control
              type="text"
              name="zip_code"
              value={zip_code}
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
            />
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
