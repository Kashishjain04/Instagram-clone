import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/index';


const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const user = useSelector(state => state.auth.user);

    if (!user) {
        if (localStorage.getItem("user")) {
            dispatch(actions.loginSuccess(JSON.parse(localStorage.getItem("user"))))
        }
    }

    useEffect(() => (
        dispatch(actions.fetchFollowedPosts())
        // eslint-disable-next-line
    ), []);

    return (
        <div className="home">
            {posts.length===0 && <h2>No Posts To Show</h2>}
            {posts.map((post) => (
                <div key={post._id} className="card home-card">
                    <h5 style={{padding: "7px"}}>
                        <Link to={post.postedBy._id === user._id ? "/profile" : "/profile/" + post.postedBy._id}>{post.postedBy.name}</Link>
                        {
                            post.postedBy._id === user._id &&
                            <i onClick={() => dispatch(actions.deletePost(post._id))} className="material-icons" style={{ float: "right", marginRight: "10px", cursor: "pointer" }}>delete</i>
                        }
                    </h5>
                    <div className="card-image">
                        <img src={post.pic} alt="post" />
                    </div>
                    <div className="card-content">
                        <h6>
                            {/* Conditionally rendering like button */}
                            {post.likes.includes(user._id) ?
                                <i onClick={() => dispatch(actions.unlikePost(post._id))} className="material-icons" style={{ color: "red", cursor: "pointer" }}>favorite</i> :
                                <i onClick={() => dispatch(actions.likePost(post._id))} className="material-icons" style={{ cursor: "pointer" }}>favorite_border</i>
                            }
                        </h6>
                        <h6 style={{ fontWeight: "700" }}>{post.likes.length} Likes</h6>
                        {/* <h6>{post.title}</h6> */}
                        <p><span style={{ fontWeight: "700" }}>{post.postedBy.name}</span>  {post.body}</p>
                        <h6>Comments- </h6>
                        {post.comments.map((comment) => (
                            <h6 key={comment._id}>
                                <span style={{ fontWeight: "700" }}>{comment.postedBy.name}</span>  {comment.text}
                                {
                                    comment.postedBy._id === user._id &&
                                    <i onClick={() => dispatch(actions.deleteComment(comment._id, post._id))} className="material-icons" style={{ float: "right", marginRight: "10px", cursor: "pointer" }}>delete</i>
                                }
                            </h6>
                        ))}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(actions.createComment(e.target[0].value, post._id))
                        }}>
                            <input
                                type="text"
                                placeholder="Comment"
                            />
                        </form>
                    </div>
                </div>

            ))}
        </div>
    );
}

export default Home;