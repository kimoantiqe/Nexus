import { 
    GROUP_CHANNEL_LIST_SUCCESS,
    GROUP_CHANNEL_LIST_FAIL,
    CREATE_CHANNEL_SUCCESS,
    CREATE_CHANNEL_FAIL,
} from './types';
import { sbGetChannels, sbCreateChannel } from '../sendbirdActions/groupChannel';

export const getGroupChannelList = (groupChannelListQuery) => {
    return (dispatch) => {
        groupChannelListQuery.includeEmpty = true;
        if(groupChannelListQuery.hasNext){
            sbGetChannels(groupChannelListQuery)
            .then((channels) => dispatch({
                type: GROUP_CHANNEL_LIST_SUCCESS,
                list: channels
            }))
            .catch((error) => {
                dispatch({ type: GROUP_CHANNEL_LIST_FAIL })
            })
        }else{
            dispatch({ type: GROUP_CHANNEL_LIST_FAIL });
        }
    }
}

export const addGroupChannel = (userids, channelName) => {
    return () => {
        console.log("adding user");
        sbCreateChannel(userids, channelName)
        .then((groupChannel) => {
            console.log(groupChannel);
        })
        .catch((error) => {
            //If connection fails.
            console.log(error);
        });
    }
}