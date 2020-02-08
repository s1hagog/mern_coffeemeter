import React, {useEffect} from 'react';
import axios from 'axios';
import { verifyToken } from '../utils/token-verification';

const SignOutUser = () => {

    useEffect(() => {
        async function userSignOut(){
            const session = await verifyToken();
            if(session){
                console.log(session);
                axios.delete('http://localhost:5000/account/delete-session', {data: session})
                    .then(() => {
                        localStorage.removeItem('coffee_meter_project_auth_token');
                        window.location = '/';
                    })
                    .catch(err => console.log('Error with delete session request: ' + err));
            }else{
                console.log('Received empty session in sign out');
            };
        }
        userSignOut();
    }, [])

    return(
        <></>
    )
}

export default SignOutUser;