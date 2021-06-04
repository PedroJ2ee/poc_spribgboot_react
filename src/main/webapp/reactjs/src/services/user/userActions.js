import * as BT from "./userTypes";
import axios from 'axios';

export const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUserRequest());
            axios.get("http://localhost:8081/rest/users")
            .then(response => {
                dispatch(fetchUserSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message));
            });
    };
};

export const saveUser = user => {
    return dispatch => {
        dispatch({
            type: BT.SAVE_USER_REQUEST
        });
        axios.post("http://localhost:8081/rest/users", user)
            .then(response => {
                dispatch(userSuccess(response.data));
            })
            .catch(error => {
                dispatch(userFailure(error));
            });
    };
};

export const fetchUser = userId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_USER_REQUEST
        });
        axios.get("http://localhost:8081/rest/users/"+userId)
            .then(response => {
                dispatch(userSuccess(response.data));
            })
            .catch(error => {
                dispatch(userFailure(error));
            });
    };
};

export const updateUser = user => {
    return dispatch => {
        dispatch({
            type: BT.UPDATE_USER_REQUEST
        });
        axios.put("http://localhost:8081/rest/users", user)
            .then(response => {
                dispatch(userSuccess(response.data));
            })
            .catch(error => {
                dispatch(userFailure(error));
            });
    };
};

export const deleteUser = userId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_USER_REQUEST
        });
        axios.delete("http://localhost:8081/rest/users/"+userId)
            .then(response => {
                dispatch(userSuccess(response.data));
            })
            .catch(error => {
                dispatch(userFailure(error));
            });
    };
};

const userSuccess = user => {
    return {
        type: BT.USER_SUCCESS,
        payload: user
    };
};

const userFailure = error => {
    return {
        type: BT.USER_FAILURE,
        payload: error
    };
};

const fetchUserRequest = () => {
    return {
        type: BT.FETCH_USER_REQUEST
    };
};

const fetchUserSuccess = users => {
    return {
        type: BT.FETCH_USER_SUCCESS,
        payload: users
    };
};

const fetchUserFailure = error => {
    return {
        type: BT.FETCH_USER_FAILURE,
        payload: error
    };
};