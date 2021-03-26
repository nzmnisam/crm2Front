import './App.css';
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


const api = axios.create({
  baseURL:'http://127.0.0.1:8000/api'
})

const App = () => {
  return (
    <div className="App">
    <Router>
      <Header />
      <Navbar />
      {/* {this.state.contacts.map(contact => <h2 key="contact.id">{contact.first_name}</h2>)} */}
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/Login" render={() => <Login api={api} />} />
        <PrivateRoute path="/Dashboard" component={Dashboard} />
        <PrivateRoute path="/NewLead" component={NewLead} />
        <PrivateRoute path="/SearchLeads" component={SearchLeads} />
      </Switch>
    </Router>
  </div>
  )
}

export default App







