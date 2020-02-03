import { getFromStrorage } from "./storage";
import axios from 'axios';

export function verifyToken(){

    const localSession = getFromStrorage('coffee_meter_project_auth_token');
    if(localSession){
        const token = localSession.token;
        const promise = axios.get(`http://localhost:5000/account/verify?token=${token}`)
        .then(res => {
            console.log(res);
            if(res.data){
                return res.data
            }else{
                localStorage.removeItem('coffee_meter_project_auth_token');
                return null;
            }
        })
        .catch(err => console.log('Error with verifying token request' + err));
        return promise;
        
    }else{
        console.log('For some reason there is no token in storage. But it has to be there');
        return null;
    }
}

export function checkToken(){
    const localSession = getFromStrorage('coffee_meter_project_auth_token');

    if(localSession.token){
        return true;
    }else{
        return false;
    }
}