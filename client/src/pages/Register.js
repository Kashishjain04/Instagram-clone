import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import M from 'materialize-css';
import { Link, useHistory } from 'react-router-dom';
import * as actions from '../store/actions/index';

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [name, setName] = useState(""),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [image, setImage] = useState(""),
        [url, setUrl] = useState("");

    useEffect(() => {
        if (url) {
            dispatch(actions.register(name, email, password, url))
        }
        // eslint-disable-next-line
    }, [url]);

    const imageUpload = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "kashish");
        fetch("https://api.cloudinary.com/v1_1/kashish/image/upload", {
            method: "post",
            body: data
        }).then((res) => res.json())
            .then((data) => {
                setUrl(data.url);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // eslint-disable-next-line
        if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
            M.toast({ html: "Invalid Email", classes: "#c62828 red darken-2" })
            return;
        }
        if (image) {
            imageUpload();
        } else {
            setUrl("http://res.cloudinary.com/kashish/image/upload/v1605442909/nx9icbb9ql8m9lqop8gc.png");
        }
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
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Upload Image</span>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button type="submit" className="btn waves-effect waves-light #64b5f6 blue darken-1">  Register </button>
                </form>
                <h6> <Link to="/login">Already registered? </Link> </h6>
            </div>
        </div>
    );
}

export default Register;
