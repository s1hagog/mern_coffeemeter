import React, {useState} from 'react';

const CreateProject = (props) => {

    const [name, setName] = useState('');
    const [description, setdescription] = useState('');
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [coffeesAmount, setcoffeesAmount] = useState(0);
    const [username, setusername] = useState('testuser123')
    const [users, setusers] = useState(['test user']);

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

        console.log(project);
    }

    return (
        <form style={{marginTop: 2 + 'em'}} onSubmit={onsubmit}>
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
                <select className="form-control" id="isprojectUser">
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
                <input type="date" className="form-control" id="iprojectStartDate" 
                    onBlur={e => setstartDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="iprojectEndDate">Project End Date</label>
                <input type="date" className="form-control" id="iprojectEndDate" 
                    onBlur={e => setendDate(e.target.value)}
                />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    )
}

export default CreateProject;