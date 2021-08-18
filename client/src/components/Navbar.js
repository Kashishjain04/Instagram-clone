
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/index';

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);    
    const renderList = () => {
        if (user) {
            return [
                <li key="profile"><Link to="/explore">Explore</Link></li>,
                <li key="profile"><Link to="/profile">Profile</Link></li>,
                <li key="post"><Link to="/create">Post</Link></li>,
                <li key="logout">
                    <button onClick={() => { dispatch(actions.logout()) }} className="btn #c62828 red darken-3">  Sign Out </button>
                </li>
            ]
        } else {
            return [
                <li key="login"><Link to="/login">Log In</Link></li>,
                <li key="register"><Link to="/register">Register</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={user ? "/" : "#"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
