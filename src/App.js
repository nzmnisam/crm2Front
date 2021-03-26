import React, { useState, useEffect, useMemo, Component } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Login from './Components/Pages/Login'
import Dashboard from './Components/Pages/Dashboard'
import NewLead from './Components/Pages/NewLead'
import SearchLeads from './Components/Pages/SearchLeads'
import Home from './Components/Pages/Home'
import Contact from './Components/Pages/Contact';
import PrivateRoute from './Components/PrivateRoute';
import RegisterUser from './Components/Pages/RegisterUser';
import ManageUsers from './Components/Pages/ManageUsers';


const api = axios.create({
  baseURL:'http://127.0.0.1:8000/api'
})

const App = () => {
  const [role, setRole] = useState('')
  const [userType, setUserType] = useState('')

  useEffect(() => {
    const storedRole = window.localStorage.getItem('role')
    if(role !== storedRole && storedRole)
      setRole(storedRole)
      if(role === 'manager') {
        setUserType('Manager view')
      } else if(role === 'sales'){
        setUserType('Employee view')
      } else {
        setUserType('')
      }
  }, [role])

  let navbar
  if(role !== '') {
    navbar = <Navbar role={role} />
  }

  return (
    <div className="App">
    <Router>
      <Header userType={userType} setRole={setRole} setUserType={setUserType}/>
      {navbar}
      {/* {this.state.contacts.map(contact => <h2 key="contact.id">{contact.first_name}</h2>)} */}
      <Switch>
        {/* <Route path="/" exact={true} component={Home} /> */}
        <Route path="/Login" render={() => <Login api={api} setRole={setRole}/>} />
        <PrivateRoute path="/Dashboard" component={Dashboard} />
        <PrivateRoute path="/NewLead" component={NewLead} />
        <PrivateRoute path="/SearchLeads" component={SearchLeads} />
        <PrivateRoute path="/RegisterUser" component={RegisterUser} />
        <PrivateRoute path="/ManageUsers" component={ManageUsers} />
      </Switch>
    </Router>
  </div>
  )
}

export default App







