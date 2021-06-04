import * as BT from "./userTypes";

const initialState = {
    user: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BT.SAVE_USER_REQUEST:
        case BT.FETCH_USER_REQUEST:
        case BT.FETCH_ROLES_REQUEST:
        case BT.UPDATE_USER_REQUEST:
        case BT.DELETE_USER_REQUEST:      
            return {
                ...state
            };
        case BT.ROLES_SUCCESS:
            return {
                roles: action.payload,
                error: ''
            };
        case BT.ROLES_FAILURE:
            return {
                roles: '',
                error: action.payload
            };
        case BT.FETCH_USER_SUCCESS:
            return {
                user: action.payload,
                error: ''
            };
        case BT.FETCH_USER_FAILURE:
            return {
                user: [],
                error: action.payload
            };
        
        default:
            return state;
    }
};

export default reducer;