import * as BT from "./clienteTypes";

const initialState = {
    cliente: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BT.SAVE_CLIENTE_REQUEST:
        case BT.FETCH_CLIENTE_REQUEST:
        case BT.UPDATE_CLIENTE_REQUEST:
        case BT.DELETE_CLIENTE_REQUEST:
        case BT.CLIENTE_SUCCESS:
            return {
                cliente: action.payload,
                error: ''
            };
        case BT.CLIENTE_FAILURE:
            return {
                cliente: '',
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;