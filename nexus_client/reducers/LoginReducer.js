import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL 
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    user: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            state.user = action.payload;
            return state;
        case LOGIN_FAIL:
            state.user = action.payload;
            return state;;
        default: 
            return state;
    }
};

