import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions/index';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const myPosts = useSelector(state => state.posts.myPosts);
    useEffect(() => {
        dispatch(actions.fetchMyPosts())
        // eslint-disable-next-line
    }, [])
    return (
        <>
            { user ?
                <div style={{ maxWidth: "550px", margin: "0 auto" }}>
                    <div className="prof-header">
                        <div>
                            <img src={user.pic}
                                alt="profile" style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            />
                        </div>
                        <div>
                            <h4>{user.name}</h4>
                            <h6>{user.email}</h6>
                            <div className="prof-details">
                                <h6>{myPosts.length} Posts</h6>
                                <h6>{user.followers.length} Followers</h6>
                                <h6>{user.following.length} Following</h6>
                            </div>
                        </div>
                    </div>
                    <div className="gallery">
                        {myPosts.map((post) => (
                            <img src={post.pic}
                                key={post._id}
                                alt={post.title}
                                className="item"
                            />
                        ))}
                    </div>
                </div>
                : <h2>Loading ...</h2>
            }
        </>
    );
}

export default Profile;