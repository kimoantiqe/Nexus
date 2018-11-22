const mongoose  = require('mongoose');
const exists = require('mongoose-exists');

let taskSchema = mongoose.Schema({
  taskTitle: {
    type: String
  },
  taskType:{
    type: String,
    enum : ['Meeting','Task']
  },
  taskInfo: {
    type: String
  },
  taskDueDate :{
    type: Date
  },
  subscribedUsers :[{
    type:mongoose.Schema.Types.ObjectId,
    ref :'User',
    exists: true
  }],
  taskOwner :{
    type:mongoose.Schema.Types.ObjectId,
    ref :'User',
    exists: true
  }
}, {
  timestamps: true
});

taskSchema.plugin(exists);

module.exports = mongoose.model('Task', taskSchema);
