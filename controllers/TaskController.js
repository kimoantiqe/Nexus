const User                    = require('./../models/user');
const Task                    = require('./../models/task');
const { to, ReE, ReS }        = require('../services/util');



// let SanatizeUpdateData = function(data){
// 	let blacklist = ['membership','role','createdAt','updatedAt','_id','__v'] ;
//
// 	for(let i=0 ; i <blacklist.length ; i++){
// 		if(data[blacklist[i]]){
// 			return true;
// 		}
// 	}
// 	return false;
//
// };

const create = async function(req, res,next){
	res.setHeader('Content-Type', 'application/json');

	const taskSchema = ['taskInfo', 'taskType' , 'taskTitle','taskDueDate','participatingUser'];

	const body = req.body;
	const user = req.user;

	for(let i =0 ;  i< taskSchema.length ; i++){
		if(!body[taskSchema[i]]) return ReE(res, 'Please enter '+taskSchema[i]+' to create task');
	}

		let err, task;
    //The following must only be handeled in the update function invoked by the put request



		//Add to user as owner
		body['taskOwner'] = user._id;

    [err, task] = await to(Task.create(body));
    if(err){return ReE(res, err, 422);}

		task.subscribedUsers.push(body['participatingUser']);
		task.subscribedUsers.push(user._id);

		[err, task] = await to(task.save());
		if(err){return ReE(res, err, 422);}

		//Add req to body
		req.taskCreated = task;
		next();
};
module.exports.create = create;

const get = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let user = req.user;
	let err, userTasks;
	[err, userTasks] = await to(User.findById(user._id).select('tasks').populate('tasks'));
	if(err){return ReE(res, err, 422);}
	return ReS(res, {tasks:userTasks.tasks});
};
module.exports.get = get;

const remove = async function(req, res){
	let taskId, err , user ,pUser, task;
	taskId = req.params.taskId;
	user = req.user;

	[err, task] = await to(Task.findOne({_id:taskId}));
	if(err) {
		return ReE(res, 'error occured trying to find task');
	}

	if(!task){
		return ReE(res, 'Task does not exist');
	}

	if(!(user._id.equals( task.taskOwner))){
		return ReE(res, 'Only task owner can delete a task');
	}


	//GET P user
	[err, pUser] = await to(User.findById(task.subscribedUsers[0]));
	if(err) {
		return ReE(res,'error occured trying to get p user');
	}

	//Delete from user 1
	[err, user] = await to ( User.update({_id: user._id}, { $pullAll: {tasks: [taskId] } })) ;
	if(err) {
		return ReE(res,'error occured trying to unlink task from owner');
	}


	//Delete from user 2
	[err, user] = await to ( User.update({_id: pUser._id}, { $pullAll: {tasks: [taskId] } })) ;
	if(err) {
		return ReE(res,'error occured trying to unlink task from participating User');
	}


	[err, taskId] = await to(Task.findOneAndRemove({_id:taskId}));
	if(err) {
		return ReE(res, 'error occured trying to delete task');
	}

	return ReS(res, {message:'Deleted task'}, 204);
};
module.exports.remove = remove;

const update = async function(req, res){
	let err, task,taskId,data;

	taskId = req.params.taskId;
	data = req.body;

	const taskSchema = ['taskInfo', 'taskType' , 'taskTitle','taskDueDate'];

	for(let i =0 ;  i< taskSchema.length ; i++){
		if(!data[taskSchema[i]]) return ReE(res, 'Please enter '+taskSchema[i]+' to create task');
	}

	delete data.participatingUser;

	[err, task] = await to(Task.findOne({_id:taskId}));
	if(err) {
		return ReE(res, 'error occured trying to retrieve task');
	}

	if(!task){
		return ReE(res, 'Cannot update non existent task');
	}
	
  task.set(data);

  [err, task] = await to(task.save());

  if(err){
	return ReE(res, err);
  }
  return ReS(res, {message :'Updated task: '+task.taskTitle});
};

module.exports.update = update;
