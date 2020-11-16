import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import M from 'materialize-css';
import * as actions from '../store/actions/index';

const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.auth.user);
    const { id } = useParams();
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch(`/user/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then((data) => {
                if(data.error){
                    M.toast({ html: data.error, classes: "#c62828 red darken-2" })
                    history.push("/")
                }
                setUserPosts(data.posts);
                setUser(data.user);
            })            
        // eslint-disable-next-line
    }, [currentUser])

    return (
        <>
            {
                user ?
                    <div style={{ maxWidth: "550px", margin: "0 auto" }}>
                        <div className="prof-header">
                            <div>
                                <img src="http://res.cloudinary.com/kashish/image/upload/v1605442909/nx9icbb9ql8m9lqop8gc.png"
                                    alt="profile" style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                />
                            </div>
                            <div>
                                <h4>{user ? user.name : "..."}</h4>
                                <h6>{user ? user.email : "..."}</h6>
                                <div className="prof-details">
                                    <h6>{userPosts.length} Post(s)</h6>
                                    <h6>{user.followers.length} Followers</h6>
                                    <h6>{user.following.length} Following</h6>
                                </div>
                                {
                                    user.followers.includes(currentUser._id) ?
                                        <button style={{margin: "10px"}} onClick={() => dispatch(actions.unfollowUser(user._id))} className="btn waves-effect waves-light #64b5f6 blue darken-1">  Unfollow </button> :
                                        <button style={{margin: "10px"}} onClick={() => dispatch(actions.followUser(user._id))} className="btn waves-effect waves-light #64b5f6 blue darken-1">  Follow </button>
                                }
                            </div>
                        </div>
                        <div className="gallery">
                            {userPosts.length===0 && <h2>No Posts Yet</h2>}
                            {userPosts.map((post) => (
                                <img src={post.pic}
                                    key={post._id}
                                    alt={post.title}
                                    className="item"
                                />
                            ))}
                        </div>
                    </div>
                    :
                    <h2>Loading ...</h2>
            }
        </>
    );
}

export default UserProfile;