//Test empty payload
module.exports.loginFail1 = (done,chai,server) => {
		let wrongCreds = {
              
        }
        chai.request(server)
            .post('/api/user/login')
            .set('Content-Type', 'application/json')
            .send(wrongCreds)
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(false);
                  res.body.should.have.property('error').eql('Please enter an email to login');
              done();
            });
      
};

//Test wrong email format
module.exports.loginFail2 = (done,chai,server) => {
		let wrongCreds = {
              email: "WrongCreds",
              password: "wrongcred1234",
        }
        chai.request(server)
            .post('/api/user/login')
            .set('Content-Type', 'application/json')
            .send(wrongCreds)
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(false);
                  res.body.should.have.property('error').eql('A valid email  was not entered');
              done();
            });
      
};

//Test missing password
module.exports.loginFail3 = (done,chai,server) => {
		let wrongCreds = {
              email: "WrongCreds@ho.com",
        }
        chai.request(server)
            .post('/api/user/login')
            .set('Content-Type', 'application/json')
            .send(wrongCreds)
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(false);
                  res.body.should.have.property('error').eql('Please enter a password to login');
              done();
            });
      
};

//Test unregistered user
module.exports.loginFail4 = (done,chai,server) => {
		let wrongCreds = {
              email: "WrongCawffaafa4aDfa92u194912u4912uafnalfnkareds@ho.com",
              password: "wrongc12redafaw11234",
        }
        chai.request(server)
            .post('/api/user/login')
            .set('Content-Type', 'application/json')
            .send(wrongCreds)
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(false);
                  res.body.should.have.property('error').eql('Not registered');
              done();
            });
      
};

var emailCreated = "test543aawfawfaf21awfawfaafafawf@12345test.com";
var passwordCreated = "test123";
var dummyUser = {};

//Test missing email in register
module.exports.registerFail1 = (done,chai,server) => {

		let register = {
              password: passwordCreated
        }
        chai.request(server)
            .post('/api/user')
            .set('Content-Type', 'application/json')
            .send(register)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(false);
                  res.body.should.have.property('error').eql('Please enter an email to register.');
              done();
            }) 
};

//Test missing password in register
module.exports.registerFail2 = (done,chai,server) => {

		let register = {
              email: emailCreated
        }
        chai.request(server)
            .post('/api/user')
            .set('Content-Type', 'application/json')
            .send(register)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(false);
                  res.body.should.have.property('error').eql('Please enter a password to register.');
              done();
            }) 
};

//Test inccorect email format
module.exports.registerFail3 = (done,chai,server) => {

		let register = {
              email: '1234',
              password: passwordCreated
        }
        chai.request(server)
            .post('/api/user')
            .set('Content-Type', 'application/json')
            .send(register)
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(false);
                  res.body.should.have.property('error').eql('A valid email was not entered.');
              done();
            }) 
};

//Test register user
module.exports.registerSuccess = (done,chai,server) => {
		let register = {
              email: emailCreated,
              password: passwordCreated,
        }
        chai.request(server)
            .post('/api/user')
            .set('Content-Type', 'application/json')
            .send(register)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
              done();
            })
};

//Test login user
module.exports.loginSuccess = (done,chai,server) => {
		let register = {
              email: emailCreated,
              password: passwordCreated,
        }
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
            })
};



//Test get user
module.exports.getSuccess = (done,chai,server) => {

        chai.request(server)
            .get('/api/user')
            .set('Content-Type', 'application/json')
            .set('Authorization',dummyUser.token)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
                  res.body.should.have.property('user').have.property('email').eql(dummyUser.user.email);
              done();
            })
};

//Test get fail due to inccorect token
module.exports.getFail1 = (done,chai,server) => {

        chai.request(server)
            .get('/api/user')
            .set('Content-Type', 'application/json')
            .set('Authorization','inccorect token')
            .end((err, res) => {
                  res.should.have.status(401); //unauthorized error code
              done();
            })
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
            })
};

//Test delete user fail due to inccorect token 
module.exports.deletefail1 = (done,chai,server) => {

        chai.request(server)

            .delete('/api/user')
            .set('Content-Type', 'application/json')
            .set('Authorization','incorrect token')
            .end((err, res) => {
                  res.should.have.status(401); //unauthorized error code
              done();
            })
};