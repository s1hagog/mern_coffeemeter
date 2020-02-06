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
        // const token = JSON.parse(localStorage.getItem('coffee_meter_project_auth_token')).token;
        // axios.get('http://localhost:5000/account/logout?token=' + token)
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(err => console.log('Error while sending delete session request: ' + err));
        // localStorage.removeItem('coffee_meter_project_auth_token');
        // window.location = '/';
        userSignOut();
    }, [])

    return(
        <></>
    )
}

export default SignOutUser;