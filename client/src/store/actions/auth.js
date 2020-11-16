import * as actionTypes from './actionTypes';
import M from 'materialize-css';

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(loginStart())
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch(loginFail(data.error));
                    M.toast({ html: data.error, classes: "#c62828 red darken-2" })
                } else {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch(loginSuccess(data.user));
                    M.toast({ html: "Logged In Successfully", classes: "#43a047 green darken-1" })
                }
            }).catch((err) => {
                dispatch(loginFail(err));
            })
    }
}

const loginStart = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOGIN_START });
    }
}

const loginFail = (err) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOGIN_FAIL, err: err });
    }
}

export const loginSuccess = (user) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOGIN_SUCCESS, user: user });
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({
            type: actionTypes.LOGOUT
        })
        window.location.pathname = "/login"
    }
}

export const register = (name, email, password, pic) => {
    return (dispatch) => {
        dispatch(registerStart())
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                pic
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch(registerFail(data.error));
                    M.toast({ html: data.error, classes: "#c62828 red darken-2" })
                } else {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch(registerSuccess(data.user));
                    M.toast({ html: "Logged In Successfully", classes: "#43a047 green darken-1" })
                }
            }).catch((err) => {
                dispatch(registerFail(err));
            })
    }
}

export const registerStart = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.REGISTER_START })
    }
}
export const registerSuccess = (user) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.REGISTER_SUCCESS, user: user })
    }
}
export const registerFail = (err) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.REGISTER_FAIL, err: err })
    }
}