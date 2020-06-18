import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminMain = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log('searching for users')
    });

    return (
        <div>
            This is admin comp
        </div>
    );
}

export default AdminMain;