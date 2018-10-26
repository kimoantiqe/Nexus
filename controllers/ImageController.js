const mongoUtil             = require('../models/index');
const Image                    = require('./../models/image');
const Grid                  = require('gridfs-stream');
const upload          = require('./../configurations/multer-gridfs');
const { to, ReE, ReS }        = require('../services/util');
const User                    = require('./../models/user');
const conn                  = mongoUtil.conn;
const mongoose              = mongoUtil.mongoose;


var gfs;
conn.once('open', ()=>{
  Grid.mongo = mongoose.mongo;
  gfs = Grid(conn.db);
});

const get =  function(req,res){
  let user = req.user
  gfs.collection('image');

  /** First check if file exists */
  gfs.files.find({_id: user.image}).toArray(function(err, files){

    if(!files || files.length === 0){
      return  ReE(res, 'file does not exists', 404);
    }

    /** create read stream */
    var readstream = gfs.createReadStream({
      filename: files[0].filename,
    });

    /** set the proper content type */
    res.set('Content-Type', files[0].contentType);
    //res.set('Content-Disposition', 'attachment; filename="' + files[0].filename + '"');
    /** return response */
    return readstream.pipe(res);
  });
};
module.exports.get = get;


const removeOld =  function(req,res,next){
  let user = req.user;
  gfs.collection('image');
  /** First check if file exists */
  gfs.remove({_id: user.image, root: 'image'}, function(err){

    if(err){
      return ReE(res, 'error occured trying to delete image');
    }else{
      next();
    }
    
  });
};
module.exports.removeOld = removeOld;

const uploadImage =  function(req,res,next){
  upload(req,res,function(err){
    if(err){
      return ReE(res, err);
    }else{
      next();
    }
  }); 
};

module.exports.uploadImage = uploadImage;



