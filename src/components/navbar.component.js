import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {


    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-md">
            <Link className="navbar-brand" to="/">Home</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        {
                            (localStorage.getItem('coffee_meter_project_auth_token'))
                                ? <Link className="nav-link" to="/projects">Projects List</Link>
                                : <Link className="nav-link" to="/">Sign In</Link>
                        }
                    </li>
                    <li className="nav-item">
                        {
                            (localStorage.getItem('coffee_meter_project_auth_token'))
                                ? <Link className="nav-link" to="/create">Create Project</Link>
                                : <Link className="nav-link" to="/user">Sign Up</Link>
                        }
                    </li>
                    <li className="nav-item">
                        {
                            (localStorage.getItem('coffee_meter_project_auth_token'))
                                ? <Link className="nav-link" to="/account/sign-out">Sign Out</Link>
                                : null
                        }
                    </li>
                    <li className="nav-item">
                        {
                            (localStorage.getItem('coffee_meter_project_auth_token'))
                                ? <Link className="nav-link" to="/">Admin Panel</Link>
                                : null
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;