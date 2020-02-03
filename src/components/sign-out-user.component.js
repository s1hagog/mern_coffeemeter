import React, {useEffect} from 'react';

const SignOutUser = () => {

    useEffect(() => {
        localStorage.removeItem('coffee_meter_project_auth_token');
        window.location = '/';
    }, [])

    return(
        <></>
    )
}

export default SignOutUser;