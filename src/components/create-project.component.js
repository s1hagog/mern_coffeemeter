import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const CreateProject = (props) => {

    const [name, setName] = useState('');
    const [description, setdescription] = useState('');
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [coffeesAmount, setcoffeesAmount] = useState(0);
    const [username, setusername] = useState('')
    const [users, setusers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users/')
            .then(res => res.json())
            .then(data => {
                if (data.length > 0){
                    setusers(data.map(user => user.username))
                    setusername(data[0].username);
                }
            })
    }, [])

    const onsubmit = (e) => {
        e.preventDefault();

        const project = {
            name,
            description,
            startDate,
            endDate,
            coffeesAmount,
            username,
        }

        fetch('http://localhost:5000/projects/add', {
            headers: {"Content-Type": "application/json; charset=utf-8"},
            method: 'POST',
            body: JSON.stringify(project)})
            .then(res => res.json())
            .then(d => console.log(d))
            .catch(err => console.log(err.json));

        window.location = '/';
    }

    return (
        <form onSubmit={onsubmit}>
            <div className="form-group">
                <label htmlFor="iprojectName">Project Name</label>
                <input type="text" className="form-control" id="iprojectName" placeholder="Enter project name here"
                    onBlur={e => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="iprojectDescription">Project Description</label>
                <textarea className="form-control" id="iprojectDescription" rows="3"
                    onBlur={e => setdescription(e.target.value)}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="iprojectCoffeesAmt">Coffee cups</label>
                <input type="number" className="form-control" id="iprojectCoffeesAmt" 
                    onBlur={e => setcoffeesAmount(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="isprojectUser">Select User</label>
                <select className="form-control" id="isprojectUser"
                    onChange={e => setusername(e.target.value)}
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
                    onChange={date => setstartDate(date)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="iprojectEndDate">Project End Date</label>
                <DatePicker
                    id="iprojectEndDate"
                    className="form-control"
                    selected={endDate}
                    onChange={date => setendDate(date)}
                />
            </div>
            <button className="btn btn-primary">Create</button>
        </form>
    )
}

export default CreateProject;