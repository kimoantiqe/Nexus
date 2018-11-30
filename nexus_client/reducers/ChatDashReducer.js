import { 
    GROUP_CHANNEL_LIST_SUCCESS,
    GROUP_CHANNEL_LIST_FAIL,
    CREATE_CHANNEL_SUCCESS,
    CREATE_CHANNEL_FAIL,
} from '../actions/types';

const INITAL_STATE = {
    list: []
}

export default (state = INITAL_STATE, action) => {
    switch(action.type) {
        case GROUP_CHANNEL_LIST_SUCCESS: 
            console.log('GROUP_CHANNEL_LIST_SUCCESS');
            console.log(action.list);
            return { ...state, list: action.list };
        case GROUP_CHANNEL_LIST_FAIL:
            console.log('GROUP_CHANNEL_LIST_FAIL');
            return state;
        case CREATE_CHANNEL_SUCCESS:
        console.log('CREATE_CHANNEL_SUCCESS');
        console.log(action.list);
            return { ...state, list: action.list };
        case CREATE_CHANNEL_FAIL:
            console.log('CREATE_CHANNEL_FAIL');
            return state;
        default:
            return state;
    }
}