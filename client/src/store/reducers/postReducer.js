import * as actionTypes from "../actions/actionTypes";
import {updateObject} from '../utility';

const initialState = {
    allPosts: [],
    posts: [],
    myPosts: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FOLLOWED_POSTS:
            return updateObject( state, { posts: action.posts.posts })
        case actionTypes.FETCH_MY_POSTS:
            return updateObject( state, { myPosts: action.posts.posts })
        case actionTypes.FETCH_ALL_POSTS:
            return updateObject( state, { allPosts: action.posts.posts })
        default:
            return state;
    }
}

export default reducer;