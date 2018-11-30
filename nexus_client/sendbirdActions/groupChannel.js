import SendBird from 'sendbird';

//Function to create 1-1 GroupChannel.
export const sbCreateChannel = (userIds, channelName) => {
    return new Promise((resolve, reject) => {
        const sb = SendBird.getInstance();
        if(sb){
            sb.GroupChannel.createChannelWithUserIds(userIds, true, channelName, null, null, null, (groupChannel, error) => {
                if (error) {
                    console.log('Create Channel failed');
                    console.log(error);
                    reject('SendBird Group Channel Creation failed');
                } else {
                    console.log('Create Channel worked');
                    resolve(groupChannel);
                }
            });
        } else {
            reject('There is no SendBird instance!');
        }
    });
};

export const sbCreateGroupChannelListQuery = () => {
    const sb = SendBird.getInstance();
    if(sb)
        return sb.GroupChannel.createMyGroupChannelListQuery();
    else    
        console.log("Group Channel Fail");
}

//Function to get a list of all the GroupChannels.
export const sbGetChannels = (channelListQuery) => {
    return new Promise((resolve, reject) => {
        channelListQuery.next(function(channelList, error){
            if (error) {
                reject("Could not retrieve the channel!");
            } else {
                resolve(channelList);
            }
        });        
    });
};

//Create a leave function so that when the user deletes the chat.
