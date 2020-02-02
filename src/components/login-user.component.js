import React, {useState, useEffect} from 'react';
import {getFromStrorage, setInStorage} from '../utils/storage';
import axios from 'axios';


import ProjectsList from './projects-list.component';

const LoginUser = () => {
    
    const [session, setsession] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [signUpError, setsignUpError] = useState('');
    const [signInError, setsignInError] = useState(false);
    const [token, settoken] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const tokenLocalStorageKey = 'coffee_meter_project_auth_token';

    useEffect(() => {
        const localSession = getFromStrorage(tokenLocalStorageKey);
        console.log(localSession);
        if(localSession){
            const localToken = localSession.token;
            axios.get(`http://localhost:5000/account/verify?token=${localToken}`)
                .then(res => {
                    console.log(res.data);
                    if(res.data.length == 1){
                        setisLoading(false);
                        settoken(localToken);
                        setsession(res.data);
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

    const onsubmit = (e) => {
        e.preventDefault();

        const user = {
            username,
            password,
        }

        axios.post('http://localhost:5000/account/login', user)
            .then(res => {
                console.log(res.data);
                if(res.data.success){
                    setInStorage(tokenLocalStorageKey, res.data);
                    setusername('');
                    setpassword('');
                    window.location = '/';
                }else{
                    setsignInError(true);
                }
            })
            .catch(err => console.log(err))
    }

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
                {
                    signInError ?
                    <p>Please check password and usernmae</p>
                    : null
                }
                <button className="btn btn-primary">Sign In</button>
            </form>
        )
    }else{
        return(
            <ProjectsList session={session}/>
        )
    }
}

export default LoginUser;