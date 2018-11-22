const User                    = require('./../models/user');
const authService             = require('./AuthService');
const { to, ReE, ReS }        = require('./util');



function getUser(element, callback) {
  if(element){
	 User.findById(element, function(err, newuser) {
	 	if(!err) {
	 	callback(newuser);
     }
    });
  }
 };


function get10users(arr, callback) {
	let userarr2= [];
	let ids=0;
	arr.forEach( function(element){
		  getUser(element,function(newuser){ userarr2.push(newuser);
			ids++;
			if(ids == arr.length){
			callback(userarr2);
		}
	});
});
};



//gets 10 potential connection for a user
const getpotconn = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
		let user = req.user;
		let arr=[];
		//gets the first id in the users potential matches array
		for(let i=0; i<7; i++){
			let potcon = user.potentialMatches[i];
			arr.push(potcon);
		}
		get10users(arr,
			function(userarr2){
				return ReS(res, {array:JSON.stringify(userarr2)});
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
  await User.find({},  async function(err, users) {
    var results =[];
     await users.forEach( function(otheruser) {
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
    await potentialMatches.push(results[x].id);
    }
    user.potentialMatches = potentialMatches;
    await user.save();
    return ReS(res, {user: user.toWeb()});
});
};
module.exports.popconns = popconns;



//gets 10 potential connection for a user
const match = async function(req, res){
  let err, user, data;
  user = req.user;
  data = req.body;

	let otheruser;
	let id = data.id;

  [err, newuser] = await to(User.findById(id));
		if( !newuser ){
			return ReE(res, "user not in your matches");
		}
		else if(newuser.InstantMatches.map((newuser) => newuser.toString()).includes(user._id.toString())){
			return ReS(res, {message: 'already matches'});
		}
		else{
			newuser.InstantMatches.push(user._id);
			user.InstantMatches.push(id);
			[err, otheruser] = await to(newuser.save());
      [err, user] = await to(user.save());
      if(err){
        return ReE(res, err , 400);
      }
			return ReS(res, {message :'Updated User: '+user.email});
		}
  };
module.exports.match = match;
