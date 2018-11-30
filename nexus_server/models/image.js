const mongoose          = require('mongoose');

var imageSchema = mongoose.Schema({
  strict: false,
});
module.exports =mongoose.model('image', imageSchema , 'image.files');