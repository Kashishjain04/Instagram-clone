import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import * as actions from '../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit");
        // eslint-disable-next-line
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid Email", classes: "#c62828 red darken-2" })
            return;
        }
        dispatch(actions.login(email, password));
    }
    if (user) {
        history.push("/");
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 className="brand-logo">Instagram</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn waves-effect waves-light #64b5f6 blue darken-1">  Login </button>
                </form>
                <h6> <Link to="/register">Don't have an account? </Link> </h6>
            </div>
        </div>
    );
}

export default Login;
