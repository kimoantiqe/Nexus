const {Expo} = require('expo-server-sdk');

// Create a new Expo SDK client
let expo = new Expo();
let messages= [];
console.log(expo);

  // // Check that all your push tokens appear to be valid Expo push tokens
  // if (!Expo.isExpoPushToken(pushToken)) {
  //   console.error(`Push token ${pushToken} is not a valid Expo push token`);
  //   continue;
  // }

  messages.push({
    to: "test",
    sound: 'default',
    body: 'This is a test notification',
    data: { withSome: 'data' },
  })


//Chunk notifications
let chunks = expo.chunkPushNotifications(messages);
let tickets = [];
(async () => {
  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
    } catch (error) {
      console.log("Yacta");
      console.error(error);
    }
  }
})();

const notify = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	const body = req.body;
	if(!body.email){
		return ReE(res, 'Please enter an email to register.');
	} else if(!body.password){
		return ReE(res, 'Please enter a password to register.');
	}else{
		let err, user;

      //The following must only be handeled in the update function invoked by the put request
      delete body.interests;
      delete body.lookingFor;
      delete body.industry;
      delete body.matches;
      delete body.potentialMatches;
      delete body.liked;
      delete body.disliked;
      [err, user] = await to(authService.createUser(body));

      if(err){

	return ReE(res, err, 422);
      }
      return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
  }
};

module.exports.notify = notify;
