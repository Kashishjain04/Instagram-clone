import * as actionTypes from './actionTypes';

// export const fetchOtherProfile = (id) => {
//     return (dispatch) => {

//     }
// }

export const followUser = (id) => {
    return (dispatch) => {
        fetch("/follow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                followId: id,
            })
        }).then(data => data.json())
            .then(data => {
                console.log(data)
                dispatch({ type: actionTypes.LOGIN_SUCCESS, user: data });
                localStorage.setItem("user", JSON.stringify(data));
            })
    }
}

export const unfollowUser = (id) => {
    return (dispatch) => {
        fetch("/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                unfollowId: id,
            })
        }).then(data => data.json())
            .then(data => {
                dispatch({ type: actionTypes.LOGIN_SUCCESS, user: data });
                localStorage.setItem("user", JSON.stringify(data));
            })
    }
}