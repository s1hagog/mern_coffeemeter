import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';
import Navbar from './components/navbar.component';
import CreateProject from './components/create-project.component';
import CreateUser from './components/create-user.component';
import EditProject from './components/edit-project.component';
import ProjectsList from './components/projects-list.component';
import ProjectCoffees from './components/project_coffees.component';
import TestRoute from './components/test.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={ProjectsList} />
        <Route path="/edit/:id" component={EditProject} />
        <Route path="/coffees/:id" component={ProjectCoffees}/>
        <Route path="/create" component={CreateProject} />
        <Route path="/user" component={CreateUser} />
        <Route path="/test" component={TestRoute} />
      </div>
    </Router>
  );
}

export default App;
