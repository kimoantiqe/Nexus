import { DISCONNECT_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    isDisconnected: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DISCONNECT_SUCCESS: 
            state.isDisconnected = true;
            return state;
        default: 
            return state;
    }
};