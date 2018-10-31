const User                    = require('./../models/user');
const authService             = require('./AuthService');
const { to, ReE, ReS }        = require('./util');




//gets 1 potential connection for a user
const getpotconn = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let user = req.user;
  let Connection;
  console.log(user.potentialMatches);

	//gets the first id in the users potential matches array
  let potcon = user.potentialMatches[0];
  console.log(user.potentialMatches);

	//gets the user associated with that id
  User.findById(potcon, function(err, newuser) {
      if(err) {
				return ReE(res, err, 422);
			}
    return ReS(res, {user:newuser.toWeb()});
  });
};
module.exports.getpotconn = getpotconn;


//populates the potential matches array for a user
const popconns = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
	var user = req.user;
  let OGinterests = user.interests;
  let OGlookingFor = user.lookingFor;
  let OGindustry = user.industry;

let results=[];

	//sorts all users in the database according to their score
  User.find({}, function(err, users) {
    var results =[];
    users.forEach( function(otheruser) {
      if(!user.liked.map((user) => user.toString()).includes(otheruser._id.toString()) &&
      !user.disliked.map((user) => user.toString()).includes(otheruser._id.toString()) &&
       otheruser._id.toString() != user._id.toString() ){
           let score =0;
           let otinterests = otheruser.interests;
           let otlookingFor = otheruser.lookingFor;
           let otindustry = otheruser.industry;


					 //calculate score
           for(let i=0; i<OGinterests.length ; i++ ){
             if(otinterests.includes(OGinterests[i])){
               score+=2;
             }
           }
           for(let j=0; j<OGlookingFor.length ; j++ ){
             if(otlookingFor.includes(OGlookingFor[j])){
               score+=3;
             }
           }
           for(let z=0; z<OGindustry.length ; z++ ){
             if(otindustry.includes(OGindustry[z])){
               score+=5;
             }
           }
           let userOb = { "id" : otheruser._id,
           "score" : score,
           "interests" : otheruser.interests,
           "industry" : otheruser.industry
	};
	results.push(userOb);
	}
    });
		//sort based on score
    var potentialMatches = [];
    results.sort(function(a,b){
      return b.score-a.score;
    });

		//store in the users potential matches array
    for(let x=0; x<results.length; x++){
      potentialMatches.push(results[x].id);
    }
    user.potentialMatches = potentialMatches;
    user.save();
});

return ReS(res, {user: user.toWeb()});
};
module.exports.popconns = popconns;
