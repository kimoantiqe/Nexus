const User                    = require('./../models/user');
const authService             = require('./../services/AuthService');
const { to, ReE, ReS }        = require('../services/util');


SanatizeUpdateData = function(data){
    var blacklist = ['membership','role','createdAt','updatedAt','_id','__v'] ;

    for(var i=0 ; i <blacklist.length ; i++){
        if(data[blacklist[i]]){
            return true;
        }
    }
    return false;
}

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
      delete body.likedBack;

    	[err, user] = await to(authService.createUser(body));
    	if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}
module.exports.create = create;

const login = async function(req, res){
	const body = req.body;
	let err, user;

	[err, user] = await to(authService.authUser(req.body));
	if(err) return ReE(res, err, 422);

	return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login;

const get = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let user = req.user;

	return ReS(res, {user:user.toWeb()});
}
module.exports.get = get;


const update = async function(req, res){
	let err, user, data ;
	user = req.user;
	data = req.body;
  if(SanatizeUpdateData(data)) return ReE(res,"You can't do that",403);

  if(data.interests){
    interests = data.interests.split(',');
    for(let i = 0 ; i < interests.length ; i++){
      if(user.interests.indexOf(interests[i]) == -1 ){
        user.interests.push(interests[i]);
      }
    }
  }
  if(data.lookingFor){
    lookingFor = data.lookingFor.split(',');
    for(let i = 0 ; i < lookingFor.length ; i++){
      if(user.lookingFor.indexOf(lookingFor[i]) == -1 ){
        user.lookingFor.push(lookingFor[i]);
      }
    }
  }
  if(data.industry){
    industry = data.industry.split(',');
    for(let i = 0 ; i < industry.length ; i++){
      if(user.industry.indexOf(industry[i]) == -1 ){
        user.industry.push(industry[i]);
      }
    }
  }

  if(data.matches){
    matches = data.matches.split(',');
    for(let i = 0 ; i < matches.length ; i++){
      if(user.matches.indexOf(matches[i]) == -1 ){
        user.matches.push(matches[i]);
      }
    }
  }

  if(data.likedBack){
    likedBack = data.likedBack.split(',');
    for(let i = 0 ; i < likedBack.length ; i++){
      if(user.likedBack.indexOf(likedBack[i]) == -1 ){
        user.likedBack.push(likedBack[i]);
      }
    }
  }

  if(data.potentialMatches){
    potentialMatches = data.potentialMatches.split(',');
    for(let i = 0 ; i < potentialMatches.length ; i++){
      if(user.potentialMatches.indexOf(potentialMatches[i]) == -1 ){
        user.potentialMatches.push(potentialMatches[i]);
      }
    }
  }

  //Deleted as they are handeled above
  delete data.interests;
  delete data.lookingFor;
  delete data.industry;
  delete data.matches;
  delete data.potentialMatches;
  delete data.likedBack;

	user.set(data);

	[err, user] = await to(user.save());
	if(err){
		console.log(err, user);

		if(err.message.includes('E11000')){
			if(err.message.includes('email')){
				err = 'This email address is already in use';
			}else{
				err = 'Duplicate Key Entry';
			}
		}

		return ReE(res, err);
	}
	return ReS(res, {message :'Updated User: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
	let user, err;
	user = req.user;

	[err, user] = await to(user.remove());
	if(err) return ReE(res, 'error occured trying to delete user');

	return ReS(res, {message:'Deleted User'}, 204);
}
module.exports.remove = remove;
