const User                    = require('./../models/user');
const authService             = require('./AuthService');
const { to, ReE, ReS }        = require('./util');



  async function getUser(element, callback) {
  
  if(element){
	  await User.findById(element,  await async function(err, newuser) {
	 	if(!err) {
    await callback(newuser);
     }
    });
  }
 
 };


 async function get10users(arr, callback) {

	let userarr2= [];
	let ids=0;
  for(let i=0; i<arr.length; i++){
		  await getUser(arr[i], await async function(newuser){ userarr2.push(newuser);
      ids++;
      
			if(ids == arr.length){
       await callback(userarr2);
		}
  });
  
}

};



//gets 10 potential connection for a user
const getpotconn =  async function(req, res){
  
	res.setHeader('Content-Type', 'application/json');
		let user = req.user;
		let arr=[];
		//gets the first id in the users potential matches array
		for(let i=0; i<7; i++){
      let potcon = user.potentialMatches[i];
      ;
			 await arr.push(potcon);
		}
		await get10users(arr, await async function(userarr2){
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
			return ReE(res, "user not found");
    }
    if(newuser == user){
      return ReE(res, "cannot add yourself");
    }
		else if(newuser.matches.map((newuser) => newuser.toString()).includes(user._id.toString())){
			return ReE(res, {message: 'already matched'});
		}
		else{
			await newuser.InstantMatches.push(user._id);
      await user.InstantMatches.push(id);
      await newuser.matches.push(user._id);
      await user.matches.push(id);
      for(let j =  user.potentialMatches.length - 1; j >= 0; j--) {
        if( user.potentialMatches[j] == id.toString()) {
           await user.potentialMatches.splice(j, 1);
        }
      }
      for(let j =  newuser.potentialMatches.length - 1; j >= 0; j--) {
        if( newuser.potentialMatches[j] == user._id.toString()) {
           await newuser.potentialMatches.splice(j, 1);
        }
      }
			[err, otheruser] = await to(newuser.save());
      [err, user] = await to(user.save());
      if(err){
        return ReE(res, err , 400);
      }
			return ReS(res, {message :'Updated User: '+user.email});
		}
  };
module.exports.match = match;
