const User          = require('./../models/user');
const validator     = require('validator');
const { to, TE }    = require('../services/util');

const getUniqueKeyFromBody = function(body){
    let uniqueKey = body.unique_key;
    if(typeof uniqueKey==='undefined'){
        if(typeof body.email != 'undefined'){
            uniqueKey = body.email;
        }else{
            uniqueKey = null;
        }
    }

    return uniqueKey;
};
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async function(userInfo){
    let uniqueKey, auth_info, err;

    auth_info={};
    auth_info.status='create';

    uniqueKey = getUniqueKeyFromBody(userInfo);
    if(!uniqueKey) {
      TE('An email was not entered.');
    }

    if(validator.isEmail(uniqueKey)){
        auth_info.method = 'email';
        userInfo.email = uniqueKey;
        let err,user;
        [err, user] = await to(User.create(userInfo));
        if(err) {
          if(err.message.includes('E11000')){
          TE('User already exists with that email');
        }
          else{
            TE(err.message); //Handle other errors here later
          }
        }
        return user;
    }else{
        TE('A valid email was not entered.');
    }
}
module.exports.createUser = createUser;

const authUser = async function(userInfo){//returns token
    let uniqueKey;
    let auth_info = {};
    auth_info.status = 'login';
    uniqueKey = getUniqueKeyFromBody(userInfo);

    if(!uniqueKey){
      TE('Please enter an email to login');
    }


    if(!userInfo.password) {
      TE('Please enter a password to login');
    }

    let user;
    if(validator.isEmail(uniqueKey)){
        auth_info.method='email';
        let err;
        [err, user] = await to(User.findOne({email:uniqueKey }));
        if(err){
        TE(err.message);
        }
    }else{
        TE('A valid email  was not entered');
    }

    if(!user) {
      TE('Not registered');
    }
    let err;
    [err, user] = await to(user.comparePassword(userInfo.password));

    if(err) {
      TE(err.message);
    }

    return user;

}
module.exports.authUser = authUser;
