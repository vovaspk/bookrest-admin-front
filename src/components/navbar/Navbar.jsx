import React, { useState } from 'react';
// import './navbar.css'
// import Logo from '../../assets/img/navbar-logo.svg'
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { getUsers } from "../../actions/user";
import { API_URL } from "../../config";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentUser = useSelector(state => state.user.currentUser)
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    //const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    useEffect(() => {
        //  dispatch(getUsers)
    }, [])

    return (
        <div className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top" />
                    Bookrest
                </div>

                {/* {isAuth && <button className="btn btn-outline-success" onClick={}>Dashboard</button>} */}
                {isAuth && <a className="nav-item nav-link" href="/dashboard">Dashboard</a>}
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Log in</NavLink></div>}
                {isAuth && <button className="btn btn-outline-success" onClick={() => dispatch(logout())}>Log out</button>}
               
            </div>
        </div>
    );
};

export default Navbar;