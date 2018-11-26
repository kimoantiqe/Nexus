
//Dummy user 1
var dummyUser = {};

module.exports.loginSuccessfb = (done,chai,server) => {
		let login = {
              access_token: 'EAARWTKVTjFgBAO1PRfWQPa2DSMGPU3Cu6soyrrmkPm9OZBKe5UHlzSkKFkLT3ZBmZBlzXaKFLJSQ76XjO6b7jSqFflofZAV4sdUJ7YlxfPyrgKyWlLtp6QgO5JMf0Jy3Ic72siUzjAytC0wZCo0TxCdfiN7Oj6O1jkHbAWn47C52ofjq4Und8'
        };
        chai.request(server)
            .post('/api/user/login/facebook')
            .set('Content-Type', 'application/json')
            .send(login)
            .end((err, res) => {
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
									res.body.user.should.have.property('facebookId').eql('103765787319899');
									dummyUser = res.body;
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
