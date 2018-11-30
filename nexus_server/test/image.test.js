
//Dummy user 1
var emailCreated = "test543aawfawfaf21awfawfaafafawf"+Date.now()+"@12345test.com";
var passwordCreated = "test123";
var dummyUser = {};

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

//Test uploadImage
module.exports.uploadImageSuccess = (done,chai,server) => {

        chai.request(server)
            .post('/api/user/image')
            .set('Content-Type', 'multipart/form-data')
						.set('Authorization',dummyUser.token)
            .attach('file', './test/testImages/test1.png', 'test1.png')
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
									res.body.should.have.property('message').include('Uploaded image for user');
              done();
            });
};

//Test change Image
module.exports.changeImageSuccess = (done,chai,server) => {

        chai.request(server)
            .put('/api/user/image')
            .set('Content-Type', 'multipart/form-data')
						.set('Authorization',dummyUser.token)
            .attach('file', './test/testImages/test2.png', 'test2.png')
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
									res.body.should.have.property('message').include('Uploaded image for user');
              done();
            });
};

//Test uploadImage
module.exports.getImageSuccess = (done,chai,server) => {

        chai.request(server)
            .get('/api/user/image')
						.set('Authorization',dummyUser.token)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Uint8Array');
              done();
            });
};


//Test get image
module.exports.getImageSuccess2 = (done,chai,server) => {
        chai.request(server)
            .get('/api/image/'+dummyUser.user.image)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Uint8Array');
              done();
            });
};


//Test get image failing bad id
module.exports.getImagefail = (done,chai,server) => {
        chai.request(server)
            .get('/api/image/wafaawf')
            .end((err, res) => {
							res.body.should.be.a('object');
							res.body.should.have.property('success').eql(false);
							res.body.should.have.property('error').include('Please enter a valid image id');
              done();
            });
};

//Test get image failing cant find image
module.exports.getImagefail2 = (done,chai,server) => {
        chai.request(server)
            .get('/api/image/'+dummyUser.user._id)
            .end((err, res) => {
							res.body.should.be.a('object');
							res.body.should.have.property('success').eql(false);
							res.body.should.have.property('error').include('file does not exists');
              done();
            });
};


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
