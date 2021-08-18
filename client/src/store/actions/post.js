import M from 'materialize-css';
import * as actionTypes from './actionTypes';

export const fetchFollowedPosts = () => {
    return (dispatch) => {
        fetch("/followedposts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then((data) => {
                dispatch({
                    type: actionTypes.FETCH_FOLLOWED_POSTS,
                    posts: data
                })
            })
    }
}

export const fetchAllPosts = () => {
    return (dispatch) => {
        fetch("/allpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then((data) => {
                dispatch({
                    type: actionTypes.FETCH_ALL_POSTS,
                    posts: data
                })
            })
    }
}

export const fetchMyPosts = () => {
    return (dispatch) => {
        fetch("/myposts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then((data) => {
                dispatch({
                    type: actionTypes.FETCH_MY_POSTS,
                    posts: data
                })
            })
    }
}

export const likePost = (id) => {
    return (dispatch) => {
        fetch("/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(() => {
                console.log("Control at fetch call");
                dispatch(fetchFollowedPosts());                
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const unlikePost = (id) => {
    return (dispatch) => {
        fetch("/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(() => {
                dispatch(fetchFollowedPosts());                
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const createComment = (text, postId) => {
    return (dispatch) => {
        fetch("/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ postId, text })
        }).then(res => res.json())
            .then(() => {
                dispatch(fetchFollowedPosts());                
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const deleteComment = (commentId, id) => {
    return (dispatch) => {
        fetch(`/deletecomment/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ commentId })
        }).then(res => res.json())
            .then(() => {
                dispatch(fetchFollowedPosts());                
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const createPost = (title, body, pic) => {
    return (dispatch) => {
        fetch("/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                title,
                body,
                pic
            })
        }).then(res => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-2" })
                } else {
                    dispatch(fetchFollowedPosts());
                    M.toast({ html: "Posted Succefully", classes: "#43a047 green darken-1" })
                    window.location.pathname = "/";
                }
            }).catch((err) => {
                console.log(err);
            })
    }
}

export const deletePost = (id) => {
    return (dispatch) => {
        fetch(`/deletepost/${id}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then((data) => {
                dispatch(fetchFollowedPosts());                
            })
    }
}