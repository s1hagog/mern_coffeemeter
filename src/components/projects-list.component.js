import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class ProjectsList extends Component {
    constructor(props) {
        super(props);

        this.deleteExerice = this.deleteExerice.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/projects/')
            .then(res => {
                this.setState({exercises: res.data});
            }).catch(err => console.log(err));
    }

    deleteExerice(id){
        axios.delete(`http://localhost:5000/projects/${id}`)
            .then(res => {
                console.log(res.data);
            });
        this.setState({exercises: this.state.exercises.filter(el => el._id !== id)})
    }


    render() {
        return (
            <div>
                <p>You are on ProjectsList Component</p>
            </div>
        )
    }
}
