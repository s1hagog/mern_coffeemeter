import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminMain = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://randomuser.me/api/')
            .then(res => {
                this.setState(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            This is admin comp
        </div>
    );
}

export default AdminMain;