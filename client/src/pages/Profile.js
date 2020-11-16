import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import M from 'materialize-css';
import * as actions from '../store/actions/index';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const myPosts = useSelector(state => state.posts.myPosts);
    const [image, setImage] = useState(undefined);

    useEffect(() => {
        dispatch(actions.fetchMyPosts())
        // eslint-disable-next-line
    }, [])

    const updatePic = () => {
        if(!image){
            return M.toast({ html: "Invalid Image", classes: "#c62828 red darken-2" })
        }
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "insta-clone");
            data.append("cloud_name", "kashish");
            fetch("https://api.cloudinary.com/v1_1/kashish/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json())
                .then((data) => {
                    dispatch(actions.updatePic(data.url));
                })
                .catch((err) => {
                    console.log(err);
                })
    }
    return (
        <>
            { user ?
                <div style={{ maxWidth: "550px", margin: "0 auto" }}>
                    <div className="prof-header">
                        <div className="prof-subheader">
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
                        <div style={{display: "flex"}} className="file-field input-field">
                            <div>
                                <span className="material-icons">
                                    arrow_circle_up
                                </span>
                                <input
                                    style={{width: "5%"}}
                                    type="file"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        <button onClick={() => updatePic()} style={{ margin: "10px 30px", border: "none", background: "none" }}><span className="material-icons">send</span></button>
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