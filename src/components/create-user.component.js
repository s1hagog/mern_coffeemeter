import React, {useState} from 'react';
import axios from 'axios'

const CreateUser = () => {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const onsubmit = (e) => {
        e.preventDefault();

        const user = {
            username,
            password,
        }

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        setusername('');
        setpassword('');
    }

    return (
        <form onSubmit={onsubmit}>
            <div className="form-group">
                <label htmlFor="iusername">Username</label>
                <input type="text" className="form-control" id="iusername" placeholder="Enter username" required
                    value={username}
                    onChange={e => setusername(e.target.value)}
                />
                <label htmlFor="ipassword">Password</label>
                <input type="password" className="form-control" id="ipassword" placeholder="Enter password" required
                    value={password}
                    onChange={e => setpassword(e.target.value)}
                />
            </div>
            <button className="btn btn-primary">Create</button>
        </form>
    );
}

export default CreateUser;