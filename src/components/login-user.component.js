import React, {useState, useEffect} from 'react';
import {getFromStrorage, setInStorage} from '../utils/storage';
import axios from 'axios';

const LoginUser = () => {

    const [isLoading, setisLoading] = useState(true);
    const [signUpError, setsignUpError] = useState('');
    const [signInError, setsignInError] = useState('');
    const [token, settoken] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    useEffect(() => {
        const localToken = getFromStrorage('coffee_meter_project_auth_token');
        if(localToken){
            axios.get(`http://localhost:5000/account/verify?token=${localToken}`)
                .then(res => {
                    if(res.data.length == 1){
                        setisLoading(false);
                        settoken(localToken);
                    }else{
                        localStorage.removeItem('coffee_meter_project_auth_token');
                        setisLoading(false);
                    }
                }).catch(err => console.log('Error sending token: ' + err));
        }else{
            setisLoading(false);
        }
        return () => {
            console.log('clean up function')
        };
    }, [])



    if(isLoading) {
        return (
            <div>
                <p>Loading application...</p>
            </div>
        )
    }
    if(!token){
        return(
            <form onSubmit={onsubmit}>
                <div className="form-group">
                    <label htmlFor="iusername">Username</label>
                    <input type="text" className="form-control" id="iusername" placeholder="Enter username" autoComplete="username" required
                        value={username}
                        onChange={e => setusername(e.target.value)}
                    />
                    <label htmlFor="ipassword">Password</label>
                    <input type="password" className="form-control" id="ipassword" placeholder="Enter password" autoComplete="current-password" required
                        value={password}
                        onChange={e => setpassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Sign In</button>
            </form>
        )
    }

    return(
        <div>
            <p>Signed</p>
        </div>
    )
}

export default LoginUser;