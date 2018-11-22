//Dummy user 1
var emailCreated = "test543aawfawfaf21awfawadfaafafawf"+Date.now()+"@12345test.com";
var passwordCreated = "test123";
var dummyUser = {};

var emailCreated1 = "test543aawf1241fawadfaafafawf"+Date.now()+"@12345test.com";
var passwordCreated1 = "test123";
var dummyUser1 = {};


//Test register user
module.exports.registerSuccess = (done,chai,server) => {
		let register = {
              email: emailCreated,
              password: passwordCreated,
        };
        chai.request(server)
            .post('/api/user')
            .set('Content-Type', 'application/json')
            .send(register)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
              done();
            });
};

//Test register user
module.exports.registerSuccess1 = (done,chai,server) => {
		let register = {
              email: emailCreated1,
              password: passwordCreated1,
        };
        chai.request(server)
            .post('/api/user')
            .set('Content-Type', 'application/json')
            .send(register)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
              done();
            });
};

//Test login user
module.exports.loginSuccess = (done,chai,server) => {
		let register = {
              email: emailCreated,
              password: passwordCreated
        };
        chai.request(server)
            .post('/api/user/login')
            .set('Content-Type', 'application/json')
            .send(register)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
                  dummyUser = res.body;
              done();
            });
};

//Test login user
module.exports.loginSuccess1 = (done,chai,server) => {
		let register = {
              email: emailCreated1,
              password: passwordCreated1
        };
        chai.request(server)
            .post('/api/user/login')
            .set('Content-Type', 'application/json')
            .send(register)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
                  dummyUser1 = res.body;
              done();
            });
};

//Test delete user
module.exports.deleteSuccess = (done,chai,server) => {

        chai.request(server)
            .delete('/api/user')
            .set('Content-Type', 'application/json')
            .set('Authorization',dummyUser.token)
            .end((err, res) => {
                  res.should.have.status(204);
              done();
            });
};


//Test delete user
module.exports.deleteSuccess1 = (done,chai,server) => {

        chai.request(server)
            .delete('/api/user')
            .set('Content-Type', 'application/json')
            .set('Authorization',dummyUser1.token)
            .end((err, res) => {
                  res.should.have.status(204);
              done();
            });
};

let createdTaskId;
//Test register user
module.exports.createTaskSuccess = (done,chai,server) => {
	let dummyTask = {
	taskTitle: 'task title12',
	taskInfo: 'info blah blah',
	taskDueDate: Date.now(),
	taskType: 'Meeting',
	participatingUser: dummyUser1.user._id
	};
        chai.request(server)
            .post('/api/user/task')
            .set('Content-Type', 'application/json')
						.set('Authorization',dummyUser.token)
            .send(dummyTask)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
									res.body.should.have.property('message').include('Successfuly created task for');
									createdTaskId = res.body.taskId;
              done();
            });
};

module.exports.getTaskSuccess = (done,chai,server) => {

        chai.request(server)
            .get('/api/user/task')
            .set('Content-Type', 'application/json')
						.set('Authorization',dummyUser.token)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
									res.body.should.have.property('tasks');
									res.body.should.have.property('success').eql(true);
              done();
            });
};

module.exports.createTaskFail1 = (done,chai,server) => {
	let incompleteTaskBody = {
		taskTitle: 'task title12',
		taskInfo: 'info blah blah'
	}
        chai.request(server)
            .post('/api/user/task')
            .set('Content-Type', 'application/json')
						.set('Authorization',dummyUser.token)
            .send(incompleteTaskBody)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
									res.body.should.have.property('error').include('Please enter');
									res.body.should.have.property('success').eql(false);
              done();
            });
};

module.exports.deleteTask = (done,chai,server) => {

        chai.request(server)
            .delete('/api/user/task/'+createdTaskId)
            .set('Content-Type', 'application/json')
						.set('Authorization',dummyUser.token)
            .end((err, res) => {
								  res.should.have.status(204);
              done();
            });
};

module.exports.deleteTaskFail1 = (done,chai,server) => {

        chai.request(server)
            .delete('/api/user/task/'+'5bdf94320e35f80015e91d0a')
            .set('Content-Type', 'application/json')
						.set('Authorization',dummyUser.token)
            .end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							res.body.should.have.property('error').eql('Task does not exist');
							res.body.should.have.property('success').eql(false);
              done();
            });
};

module.exports.deleteTaskFail2 = (done,chai,server) => {

        chai.request(server)
            .delete('/api/user/task/'+createdTaskId)
            .set('Content-Type', 'application/json')
						.set('Authorization',dummyUser1.token)
            .end((err, res) => {
								  res.should.have.status(200);
									res.body.should.be.a('object');
									res.body.should.have.property('error').eql('Only task owner can delete a task');
              done();
            });
};
