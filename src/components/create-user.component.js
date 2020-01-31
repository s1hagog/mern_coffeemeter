import React, {useState} from 'react';

const CreateUser = () => {

    const [username, setusername] = useState('');

    const onsubmit = (e) => {
        e.preventDefault();

        const user = {
            username,
        }

        console.log(user);
        setusername('');
    }

    return (
        <form onSubmit={onsubmit}>
            <div className="form-group">
                <label htmlFor="iusername">Username</label>
                <input type="text" className="form-control" id="iusername" placeholder="Enter username" required
                    value={username}
                    onChange={e => setusername(e.target.value)}
                />
            </div>
            <button className="btn btn-primary">Create</button>
        </form>
    );
}

export default CreateUser;