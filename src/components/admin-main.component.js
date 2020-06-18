import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminMain = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/projects/user/' + this.props.session.userId)
            .then(res => {
                this.setState({ projects: res.data });
            }).catch(err => console.log(err));
    });

    return (
        <div>
            This is admin comp
        </div>
    );
}

export default AdminMain;