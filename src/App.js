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

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

const timeApi = axios.create({
  baseUrl: "http://worldtimeapi.org/api",
});

const App = () => {
  const [stages, setStages] = useState([]);

  const [contacts, setContacts] = useState([]);

  const [staff, setStaff] = useState([]);

  const [role, setRole] = useState("");
  const [userType, setUserType] = useState("");
  const [refresh, setRefresh] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    if (role !== "") {
      setRefresh(false);
      const apiToken = window.localStorage.getItem("api_token");
      const staffId = window.localStorage.getItem("staff_id");

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
                  // console.log(contact.deal_size);
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
  }, [role, contacts, staff, stages, refresh]);

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
                api={api}
                setRefresh={setRefresh}
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
                setContacts={setContacts}
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
        </Switch>
      </Router>
    </div>
  );
};

export default App;
