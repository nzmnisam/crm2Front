import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Components/Header";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import NewLead from "./Components/Pages/NewLead";
import PrivateRoute from "./Components/PrivateRoute";
import RegisterUser from "./Components/Pages/RegisterUser";
import ManageEmployee from "./Components/Pages/ManageEmployee";
import isEqual from "lodash.isequal";
import EditContact from "./Components/Pages/EditContact";
import Companies from "./Components/Pages/Companies";
import EditCompany from "./Components/Pages/EditCompany";
import AddCompany from "./Components/Pages/AddCompany";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

const timeApi = axios.create({
  baseUrl: "http://worldtimeapi.org/api",
});

const App = () => {
  const [stages, setStages] = useState([]);
  const [cities, setCities] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companiesDetailed, setCompaniesDetailed] = useState([]);

  const [contacts, setContacts] = useState([]);

  const [staff, setStaff] = useState([]);

  const [role, setRole] = useState("");
  const [userType, setUserType] = useState("");
  const [refresh, setRefresh] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const apiToken = window.localStorage.getItem("api_token");
  const staffId = window.localStorage.getItem("staff_id");

  useEffect(() => {
    const storedRole = window.localStorage.getItem("role");
    if (role !== storedRole && storedRole) setRole(storedRole);
    if (role === "manager") {
      setUserType("Manager view");
    } else if (role === "sales") {
      setUserType("Employee view");
    } else {
      setUserType("");
    }
  }, [role]);

  useEffect(() => {
    if (role !== "") {
      api
        .get(`/companies/detailed`, { headers: { token: apiToken } })
        .then((res) => {
          if (!isEqual(res.data, companiesDetailed)) {
            setCompaniesDetailed(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [apiToken, companiesDetailed, role, refresh]);

  useEffect(() => {
    if (role !== "") {
      api
        .get(`/companies`, { headers: { token: apiToken } })
        .then((res) => {
          if (!isEqual(res.data, companies)) {
            setCompanies(res.data);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            return alert("Can't retrieve companies");
          }
        });
    }
  }, [apiToken, companies, role, refresh]);

  useEffect(() => {
    if (role === "manager") {
      api
        .get(`/staff`, { headers: { token: apiToken } })
        .then((res) => {
          res.data.map((staffMember, i) => {
            res.data[i].deal_size = 0;
          });
          res.data.map((staffMember, i) => {
            let totalDealSize = 0;
            contacts.map((contact) => {
              if (contact.staff_id === staffMember.id) {
                // console.log(contact.deal _size);
                totalDealSize += contact.deal_size;
                // staff[i].deal_size = 0;
              }
            });
            res.data[i].deal_size = totalDealSize;
          });

          if (!isEqual(res.data, staff)) {
            setStaff(res.data);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  }, [apiToken, contacts, role, staff, refresh]);

  useEffect(() => {
    if (role !== "") {
      setRefresh(false);

      api
        .get(`/contacts/detailed`, { headers: { token: apiToken } })
        .then((res) => {
          if (!isEqual(res.data, contacts)) {
            setContacts(res.data);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });

      if (!stages.length) {
        api
          .get(`/stages`, { headers: { token: apiToken } })
          .then((res) => {
            if (!isEqual(res.data, stages)) {
              setStages(res.data);
            }
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      }
      if (!cities.length) {
        api
          .get(`/cities`, { headers: { token: apiToken } })
          .then((res) => {
            if (!isEqual(res.data, cities)) {
              setCities(res.data);
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              return alert("Can't retrieve cities");
            }
          });
      }
    }
  }, [role, contacts, stages, refresh, cities, apiToken]);

  let navbar;
  if (role !== "") {
    navbar = <Navbar role={role} />;
  }

  return (
    <div className="App">
      <Router>
        <Header
          userType={userType}
          setRole={setRole}
          setUserType={setUserType}
          timeApi={timeApi}
        />
        {navbar}
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => {
              return role !== "" || role !== null ? (
                <Redirect to="/Dashboard" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            path="/Login"
            render={() => <Login api={api} setRole={setRole} />}
          />
          <PrivateRoute
            path="/Dashboard"
            component={() => (
              <Dashboard
                stages={stages}
                setStages={setStages}
                contacts={contacts}
                setContacts={setContacts}
                role={role}
                staff={staff}
                setStaff={setStaff}
              />
            )}
          />
          <PrivateRoute
            path="/NewLead"
            component={() => (
              <NewLead
                setContacts={setContacts}
                stages={stages}
                cities={cities}
                setCities={setCities}
                companies={companies}
                setCompanies={setCompanies}
                api={api}
                setRefresh={setRefresh}
              />
            )}
          />
          <PrivateRoute
            path="/AddCompany"
            component={() => (
              <AddCompany
                cities={cities}
                setCities={setCities}
                api={api}
                setRefresh={setRefresh}
              />
            )}
          />
          <PrivateRoute
            path="/Companies"
            component={() => (
              <Companies
                // stages={stages}
                // setStages={setStages}
                companies={companies}
                setCompanies={setCompanies}
                companiesDetailed={companiesDetailed}
                setCompaniesDetailed={setCompaniesDetailed}
                // role={role}
                staff={staff}
                // setStaff={setStaff}
                api={api}
              />
            )}
          />
          <PrivateRoute
            path="/RegisterUser"
            component={() => <RegisterUser api={api} setRefresh={setRefresh} />}
          />
          <PrivateRoute
            path="/EditContact/:id"
            component={() => (
              <EditContact
                contacts={contacts}
                stages={stages}
                cities={cities}
                setCities={setCities}
                setContacts={setContacts}
                companies={companies}
                setCompanies={setCompanies}
                api={api}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            )}
          />
          <PrivateRoute
            path="/ManageEmployee/:id"
            component={() => (
              <ManageEmployee
                contacts={contacts}
                stages={stages}
                setContacts={setContacts}
                api={api}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            )}
          />
          <PrivateRoute
            path="/EditCompany/:id"
            component={() => (
              <EditCompany
                cities={cities}
                api={api}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
