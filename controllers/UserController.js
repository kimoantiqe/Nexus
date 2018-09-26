const User                    = require('./../models/user');
const authService             = require('./../services/AuthService');


const create = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	const body = req.body;
    if(!body.email){
    	return ReE(res, 'Please enter an email to register.');
    } else if(!body.password){
    	return ReE(res, 'Please enter a password to register.');
    }else{
    	let err, user;

    	[err, user] = await to(authService.createUser(body));

    	if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);//to be changed
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
	let err, user, data
	user = req.user;
	data = req.body;

	if(SanatizeUpdateData(data)) return ReE(res,"You can't do that",403);
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
