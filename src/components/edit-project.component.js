import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditProject extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCoffees = this.onChangeCoffees.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            coffeesAmount: 0,
            username: '',
            startDate: new Date(),
            endDate: new Date(),
            users: [],
        }

        // const {name, description, coffeesAmount, username, startDate, endDate, users} = this.state;

    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if(res.data.length > 0){
                    this.setState({
                        users: res.data.map(user => user.username)
                    })
                }
            }).catch(
                err => console.log(err)
            );

        axios.get(`http://localhost:5000/projects/${this.props.match.params.id}`)
            .then(res => {
                const {name, description, coffeesAmount, username, startDate, endDate} = res.data;
                this.setState({
                    name,
                    description,
                    coffeesAmount: new Number(coffeesAmount),
                    username,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                })
            }).catch(err => console.log(err));
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeCoffees(e) {
        this.setState({
            coffeesAmount: e.target.value
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeStartDate(startDate) {
        this.setState({
            startDate
        })
    }

    onChangeEndDate(endDate) {
        this.setState({
            endDate
        })
    }   

    onSubmit(e) {
        e.preventDefault();

        const {name, description, coffeesAmount, username, startDate, endDate} = this.state;
        const project = {
            name,
            description,
            startDate,
            endDate,
            coffeesAmount,
            username,
        }

        axios.post(`http://localhost:5000/projects/update/${this.props.match.params.id}`, project)
            .then( res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = '/'
        
    }

    render() {
        const {name, description, coffeesAmount, username, startDate, endDate, users} = this.state;
        return (
            
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="iprojectName">Project Name</label>
                    <input type="text" className="form-control" id="iprojectName" placeholder="Enter project name here"
                        value={name} 
                        onChange={this.onChangeName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="iprojectDescription">Project Description</label>
                    <textarea className="form-control" id="iprojectDescription" rows="3"
                        value={description}
                        onChange={this.onChangeDescription}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="iprojectCoffeesAmt">Coffee cups</label>
                    <input type="number" className="form-control" id="iprojectCoffeesAmt" 
                        value={coffeesAmount}
                        onChange={this.onChangeCoffees}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="isprojectUser">Select User</label>
                    <select className="form-control" id="isprojectUser"
                        onChange={this.onChangeUsername}
                        value={username}
                    >
                        {
                            users.map(user => 
                            (
                                <option key={user} value={user}>{user}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="iprojectStartDate">Project Start Date</label>
                    <DatePicker
                        id="iprojectStartDate"
                        className="form-control"
                        selected={startDate}
                        onChange={this.onChangeStartDate}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="iprojectEndDate">Project End Date</label>
                    <DatePicker
                        id="iprojectEndDate"
                        className="form-control"
                        selected={endDate}
                        onChange={this.onChangeEndDate}
                    />
                </div>
                <button className="btn btn-primary">Update</button>
            </form>
        )
    }
}
