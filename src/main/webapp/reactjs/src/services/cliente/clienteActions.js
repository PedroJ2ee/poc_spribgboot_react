import * as BT from "./clienteTypes";
import axios from 'axios';

export const saveCliente = cliente => {
    return dispatch => {
        dispatch({
            type: BT.SAVE_CLIENTE_REQUEST
        });
        axios.post("http://localhost:8081/rest/clientes", cliente)
            .then(response => {
                dispatch(clienteSuccess(response.data));
            })
            .catch(error => {
                dispatch(clienteFailure(error));
            });
    };
};

export const fetchCliente = clienteId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_CLIENTE_REQUEST
        });
        axios.get("http://localhost:8081/rest/clientes/"+clienteId)
            .then(response => {
                dispatch(clienteSuccess(response.data));
            })
            .catch(error => {
                dispatch(clienteFailure(error));
            });
    };
};

export const updateCliente = cliente => {
    return dispatch => {
        dispatch({
            type: BT.UPDATE_CLIENTE_REQUEST
        });
        axios.put("http://localhost:8081/rest/clientes", cliente)
            .then(response => {
                dispatch(clienteSuccess(response.data));
            })
            .catch(error => {
                dispatch(clienteFailure(error));
            });
    };
};

export const deleteCliente = clienteId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_CLIENTE_REQUEST
        });
        axios.delete("http://localhost:8081/rest/clientes/"+clienteId)
            .then(response => {
                dispatch(clienteSuccess(response.data));
            })
            .catch(error => {
                dispatch(clienteFailure(error));
            });
    };
};

const clienteSuccess = cliente => {
    return {
        type: BT.CLIENTE_SUCCESS,
        payload: cliente
    };
};

const clienteFailure = error => {
    return {
        type: BT.CLIENTE_FAILURE,
        payload: error
    };
};