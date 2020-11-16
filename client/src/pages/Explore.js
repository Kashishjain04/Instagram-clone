import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/index';

const Explore = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.allPosts)
    useEffect(() => (
        dispatch(actions.fetchAllPosts())
        // eslint-disable-next-line
    ), []);
    console.log(posts);
    return (
        <div>
            <div className="gallery">
                {posts.length === 0 && <h2>No Posts Yet</h2>}
                {posts.map((post) => (
                    <Link className="item card home-card" key={post._id} to={"/profile/" + post.postedBy.email}>
                        <img height="300px" 
                            src={post.pic}
                            alt={post.title}
                            className="item-image"
                        />
                        <h6>{post.postedBy.name}</h6>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Explore;
