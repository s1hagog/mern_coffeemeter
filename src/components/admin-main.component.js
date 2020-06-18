// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const AdminMain = () => {

//     // const [users, setUsers] = useState([]);

//     // useEffect(() => {
//     //     axios.get('http://localhost:5000/users/all')
//     //         .then(res => {
//     //             this.setState(res.data);
//     //         })
//     //         .catch(err => console.log(err));
//     // }, []);

//     return (
//         <div>
//             This is admin comp
//         </div>
//     );
// }

// export default AdminMain;

import React from 'react';

const TestRoute = () => {

    return (
        <div className="alert alert-primary" role="alert">
            This is a test component!
        </div>
    );
}

export default TestRoute;