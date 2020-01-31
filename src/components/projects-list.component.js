import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ProjectThumbnail = (props) => {

    const {_id, name, description, startDate, endDate, coffeesAmount, username} = props.project;

    return (
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">{name}</text></svg>
            <div className="card-body">
              <p className="card-text">{description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                    <Link to={`/edit/${_id}`}>
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                    </Link>
                    <Link to={`/edit/${_id}`}>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    </Link>
                </div>
                <small className="text-muted"><a href="#" onClick={() => {props.deleteProject(_id)}}>Delete</a></small>
              </div>
            </div>
          </div>
        </div>
    );
}

export default class ProjectsList extends Component {
    constructor(props) {
        super(props);

        this.deleteProject = this.deleteProject.bind(this);

        this.state = {projects: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/projects/')
            .then(res => {
                this.setState({projects: res.data});
            }).catch(err => console.log(err));
    }

    deleteProject(id){
        axios.delete(`http://localhost:5000/projects/${id}`)
            .then(res => {
                console.log(res.data);
            });
        this.setState({projects: this.state.projects.filter(el => el._id !== id)})
    }


    render() {
        const projects = this.state.projects;
        return (
            <div className="album py-5 bg-light">
                <div className="row">
                    {
                        projects.map(project => {
                            return <ProjectThumbnail project={project} deleteProject={this.deleteProject} key={project._id}/>
                        })
                    }
                </div>
            </div>
        )
    }
}
