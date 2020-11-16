import * as actionTypes from "../actions/actionTypes";
import {updateObject} from '../utility';

const initialState = {
    user: null,
    loading: false,
    err: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return updateObject( state, { loading: true })
        case actionTypes.LOGIN_SUCCESS:
            return updateObject( state, { user: action.user, loading: false })
        case actionTypes.LOGIN_FAIL:
            return updateObject( state, { err: action.err, loading: false })
        case actionTypes.LOGOUT:
            return updateObject( state, { user: null })        
        case actionTypes.REGISTER_START:
            return updateObject( state, { loading: true })
        case actionTypes.REGISTER_SUCCESS:
            return updateObject( state, { user: action.user, loading: false })
        case actionTypes.REGISTER_FAIL:
            return updateObject( state, { err: action.err, loading: false })        
        default:
            return state;
    }
}

export default reducer;