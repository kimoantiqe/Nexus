import SendBird from 'sendbird';

const APP_ID = '5684560F-4764-4763-A8EB-3AD372D8B9EB';

//Connect Function.
export const sbConnect = (userId, nickname) => {
    return new Promise((resolve, reject) => {
        //Create new connection.
        const sb = new SendBird({ 'appId': APP_ID });
        //Initiate connection to our sendbird backend
        sb.connect(userId, (user, error) => {
            //Handles the error
            if (error) {
                reject('SendBird Login Failed.');
            } else {
                //Update the user profile to view his name, 
                //Second option is set to null until we implement 
                //profile pics.
                sb.updateCurrentUserInfo(nickname, null, (user, error) => {
                    if (error) {
                        reject('Update User Failed.');
                    } else {
                        resolve(user);
                    }
                })
            }
        })
    })
};

//Disconnect Function.
export const sbDisconnect = () => {
    return new Promise((resolve, reject) => {
        const sb = SendBird.getInstance();
        if (sb) {
            sb.disconnect(() => {
                resolve(null);
            });
        } else {
            resolve(null);
        }
    })
}