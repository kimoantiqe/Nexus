const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const bcrypt_p  = require('bcrypt-promise');
const jwt       = require('jsonwebtoken');
const validate  = require('mongoose-validator');
const exists = require('mongoose-exists');
const {TE,to}   = require('../services/util');
const jwtConfig = require('../configurations/jwt');

let UserSchema = mongoose.Schema({
  image:{
    type:mongoose.Schema.Types.ObjectId,
    ref :'image',
    exists: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  bio:{
    type: String
  },
  interests :[{
    type: String,
    enum : ['IA','IB','IC','ID']
  }] ,
  lookingFor :[{
    type: String,
    enum : ['LA','LB','LC','LD']
  }] ,
  industry :[{
    type: String,
    enum : ['INA','INB','INC','IND']
  }] ,
  geolocation : {
    type : String
  },
  potentialMatches :[{
    type:mongoose.Schema.Types.ObjectId,
    ref :'User',
    exists: true
  }],
  matches :[{
    type:mongoose.Schema.Types.ObjectId,
    ref :'User',
    exists: true
  }],
  liked :[{
    type:mongoose.Schema.Types.ObjectId,
    ref :'User',
    exists: true
  }],
  disliked :[{
    type:mongoose.Schema.Types.ObjectId,
    ref :'User',
    exists: true
  }],
  reLogg : {
    type : Boolean,
    default : false
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
    validate: [validate({
      validator: 'isEmail',
      message: 'Not a valid email.',
    }), ]
  },
  password: {
    type: String
  },

}, {
  timestamps: true
});

UserSchema.plugin(exists);
UserSchema.pre('save', async function(next) {

  if (this.isModified('password') || this.isNew) {

    let err, salt, hash;
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) TE(err.message, true);

    [err, hash] = await to(bcrypt.hash(this.password, salt));
    if (err) TE(err.message, true);

    this.password = hash;

  } else {
    return next();
  }
})

UserSchema.methods.comparePassword = async function(pw) {
  let err, pass;
  if (!this.password) TE('password not set');

  [err, pass] = await to(bcrypt_p.compare(pw, this.password));
  if (err) TE(err);

  if (!pass) TE('invalid password');

  return this;
}

UserSchema.methods.getJWT = function() {
  let expiration_time = parseInt(jwtConfig.expiration);
  return "Bearer " + jwt.sign({
    user_id: this._id
  }, jwtConfig.encryption, {
    expiresIn: expiration_time
  });
};

UserSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id;
  return json;
};


let User = module.exports = mongoose.model('User', UserSchema);
