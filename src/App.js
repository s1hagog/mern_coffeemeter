import React from 'react';
import {BroswerRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={ProjectList} />
      <Route path="/edit/:id" component={EditProject} />
      <Route path="/create" component={CreateProject} />
      <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
