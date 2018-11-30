import { DISCONNECT_SUCCESS } from './types';
import { sbDisconnect } from '../sendbirdActions';

//Function that will logout our user from Sendbird backend.
export const sendbirdLogout = () => {
    return (dispatch) => {
        sbDisconnect()
        .then(() => dispatch({ type: DISCONNECT_SUCCESS }));
    }
}