const User                    = require('./../models/user');
const authService             = require('./../services/AuthService');
const { to, ReE, ReS }        = require('../services/util');
const matchingService         = require('./../services/matchingService');



let SanatizeUpdateData = function(data){
	let blacklist = ['membership','role','createdAt','updatedAt','_id','__v'] ;

	for(let i=0 ; i <blacklist.length ; i++){
		if(data[blacklist[i]]){
			return true;
		}
	}
	return false;

};

const create = async function(req, res){
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

module.exports.create = create;

const login = async function(req, res){
	const body = req.body;
	let err, user;

	[err, user] = await to(authService.authUser(req.body));
	if(err) {
		return ReE(res, err, 422);
	}

	return ReS(res, {token:user.getJWT(), user:user.toWeb()});
};
module.exports.login = login;

const get = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let user = req.user;

	return ReS(res, {user:user.toWeb()});
};
module.exports.get = get;

const update = async function(req, res){
	let err, user, data ;
	user = req.user;
	data = req.body;

	if(SanatizeUpdateData(data)) {
		return ReE(res,"You can't do that",403);
	}

	//Push into respective field into user object
	pushIntoUser(user,data.interests,'interests');
	pushIntoUser(user,data.lookingFor,'lookingFor');
	pushIntoUser(user,data.industry,'industry');
	pushIntoUser(user,data.matches,'matches');
	pushIntoUser(user,data.potentialMatches,'potentialMatches');
	pushLikes(user, data.liked);
	pushDislikes(user,data.disliked);


  //Deleted as they are handeled above
  delete data.interests;
  delete data.lookingFor;
  delete data.industry;
  delete data.matches;
  delete data.potentialMatches;
  delete data.liked;
  delete data.disliked;

  user.set(data);


  [err, user] = await to(user.save());
  if(err){

	if(err.message.includes('E11000')){
		if(err.message.includes('email')){
			err = 'This email address is already in use';
		}

		//else{ Add this to handle other duplicate entries
			//err = 'Duplicate Key Entry';
		//}
	}

	return ReE(res, err , 400);
  }
  return ReS(res, {message :'Updated User: '+user.email});
};

module.exports.update = update;


const getuser = async function(req, res){

	res.setHeader('Content-Type', 'application/json');
	let user = req.user;
	let err;
	let otheruser;
	let id = req.query.id;
	console.log(id);
	User.findById(id, function(err, newuser) {
		if(newuser.matches.map((newuser) => newuser.toString()).includes(user._id.toString())){
			otheruser = newuser;
			return ReS(res, {user:newuser.toWeb()});
		}
		else{
			return ReE(res, "user not in your matches");
		}
	});
};

module.exports.getuser = getuser;


const remove = async function(req, res){
	let user, err;
	user = req.user;

	[err, user] = await to(user.remove());
	if(err) {
		return ReE(res, 'error occured trying to delete user');
	}

	return ReS(res, {message:'Deleted User'}, 204);
};
module.exports.remove = remove;


const setUserImage = async function(req,res){

	let user = req.user;
	let file = req.file;
	let err;
	user.set({image:file.id});
	[err, user] = await to(user.save());
	if(err) {
		return ReE(res, err);
	}
	return ReS(res, {message :'Uploaded image for user : '+user.email} , 201);
};

module.exports.setUserImage = setUserImage;

function pushIntoUser(user,field,fieldType){
	if(field){
		for(let i = 0 ; i < field.length ; i++){
			if(user[fieldType].indexOf(field[i]) === -1 ){
				user[fieldType].push(field[i]);
			}
		}
	}
}

function pushLikes(user, field){
	if(field){
		for(let i = 0 ; i < field.length ; i++){
			if(user.liked.indexOf(field[i]) === -1 ){
				user.liked.push(field[i]);
				user.potentialMatches.shift();
				User.findById(field[i], function(err, newuser) {
					if(newuser.liked.map( (user) => user.toString()).includes(user._id.toString())){
						newuser.matches.push(user._id);
						user.matches.push(field[i]);
						newuser.save();
						user.save();
					}
					else{
						user.save();
					}
				});
			}
		}
	}
}

function pushDislikes (user,field){
	if(field){
		for(let i = 0 ; i < field.length ; i++){
			if(user.disliked.indexOf(field[i]) === -1 ){
				user.disliked.push(field[i]);
				user.potentialMatches.shift();
			}
		}
	}
}
