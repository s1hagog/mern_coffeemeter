import React, {useState, useEffect} from 'react';
import {getFromStrorage, setInStorage} from '../utils/storage';
import {Link} from 'react-router-dom';
import axios from 'axios';


import ProjectsList from './projects-list.component';

const LoginUser = () => {
    
    const [session, setsession] = useState({});
    const [isLoading, setisLoading] = useState(true);
    // const [signUpError, setsignUpError] = useState('');
    const [signInError, setsignInError] = useState(false);
    const [token, settoken] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [usernameFound, setUsernameFound] = useState(false);
 
    const tokenLocalStorageKey = 'coffee_meter_project_auth_token';

    useEffect(() => {
        const localSession = getFromStrorage(tokenLocalStorageKey);
        // console.log(localSession);
        if(localSession){
            const localToken = localSession.token;
            axios.get(`http://localhost:5000/account/verify?token=${localToken}`)
                .then(res => {
                    // console.log(res.data);
                    if(res.data){
                        setsession(res.data);
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

    const onsubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/account/find-user', username)
            .then(res => {
                console.log(res.data);
                if(res.data.success){
                    setInStorage(tokenLocalStorageKey, res.data);
                    setusername('');
                    setpassword('');
                    window.location = '/';
                }else{
                    console.log('Nopeeeeeeeeeeeeeee')
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
                    {
                        !usernameFound ?
                        <>
                            <label htmlFor="iusername">Your Username</label>
                            <input type="text" className="form-control" id="iusername" placeholder="Enter username" autoComplete="username" 
                                value={username}
                                onChange={e => setusername(e.target.value)}
                            />
                        </>
                        :null
                    }
                    {
                        usernameFound ?
                        <>
                        <label htmlFor="ipassword">Password</label>
                        <input type="password" className="form-control" id="ipassword" placeholder="Enter password" autoComplete="current-password" required
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                        /></>
                        : null
                    }
                </div>
                {
                    signInError ?
                    <p>Please check password and username</p>
                    : null
                }
                <button className="btn btn-primary">Check</button>
            </form>
        )
    }else{
        if(session){
            console.log('we are here');
            return(
                <ProjectsList session={session}/>
            )
        }else{
            return(
                <p>Something not right here...</p>
            )
        }
    }
}

export default LoginUser;