import {
    LOGIN_SUCCESS, 
    LOGIN_FAIL
} from './types';

import { sbConnect } from '../sendbirdActions';

export const sendbirdLogin = ({ userId, nickname }) => {
    return (dispatch) => {
        sbConnect(userId, nickname)
        .then((user) => {
            //If connection is successful
            console.log("Login Success");
            dispatch({
                type: LOGIN_SUCCESS, 
                payload: user 
            })
        })
        .catch((error) => {
            //If connection fails.
            console.log(error);
            dispatch({ 
                type: LOGIN_FAIL,
                payload: error
            })
        });
    }
}