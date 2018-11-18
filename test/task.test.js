//Dummy user 1
var emailCreated = "test543aawfawfaf21awfawadfaafafawf"+Date.now()+"@12345test.com";
var passwordCreated = "test123";
var dummyUser = {};

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

var dummyTask = {
taskTitle: 'task title12',
taskInfo: 'info blah blah',
taskDueDate: Date.now(),
taskType: 'Meeting'
};
//Test register user
module.exports.createTaskSuccess = (done,chai,server) => {

        chai.request(server)
            .post('/api/user/task')
            .set('Content-Type', 'application/json')
						.set('Authorization',dummyUser.token)
            .send(dummyTask)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
									res.body.should.have.property('message').eql('Successfuly created task for user : '+emailCreated);
              done();
            });
};

module.exports.getTaskSuccess = (done,chai,server) => {

        chai.request(server)
            .get('/api/user/task')
            .set('Content-Type', 'application/json')
						.set('Authorization',dummyUser.token)
            .send(dummyTask)
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
