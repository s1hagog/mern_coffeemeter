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
      <Navbar />
      <div className="container">
        <Route path="/" exact component={ProjectsList} />
        <Route path="/edit/:id" component={EditProject} />
        <Route path="/coffees/:id" component={ProjectCoffees}/>
        <Route path="/create" component={CreateProject} />
        <Route path="/user" component={CreateUser} />
        <Route path="/test" component={TestRoute} />
        <footer>
        <div>
          Icons made by 
          <a href="https://www.flaticon.com/authors/srip" title="srip"> srip </a> 
          from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        </div>
      </footer>
      </div>
      
    </Router>
  );
}

export default App;
