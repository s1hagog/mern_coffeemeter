import React, {useState, useEffect} from 'react';
import {getFromStrorage, setInStorage} from '../utils/storage';
import axios from 'axios';

const LoginUser = () => {

    const [isLoading, setisLoading] = useState(true);
    const [signUpError, setsignUpError] = useState('');
    const [signInError, setsignInError] = useState('');
    const [token, settoken] = useState('');

    useEffect(() => {
        const token = getFromStrorage('coffee_meter_project_auth_token');
        if(token){
            axios.get(`http://localhost:5000/account/verify?token=${token}`)
                .then(res => {
                    if(res.data.length == 1){
                        console.log('Token is correct!')
                        setisLoading(false);
                    }else{
                        console.log('We need to delete the token')
                    }
                })
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
            <div>
                <p>Sign in Sign up</p>
            </div>
        )
    }

    return(
        <div>
            <p>Signed</p>
        </div>
    )
}

export default LoginUser;