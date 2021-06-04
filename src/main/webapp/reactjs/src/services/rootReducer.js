import {combineReducers} from 'redux';
import userReducer from './user/userReducer';
import authReducer from './user/auth/authReducer';
import clienteReducer from './cliente/clienteReducer';

const rootReducer = combineReducers({
    user: userReducer,
    cliente: clienteReducer,
    auth: authReducer
});

export default rootReducer;