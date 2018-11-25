
//Dummy user 1
var dummyUser = {};

module.exports.loginSuccessfb = (done,chai,server) => {
		let login = {
              access_token: 'EAARWTKVTjFgBAMVPNXTMxgeRHNQfMnbrJ4ZAUB7V0EKGx9TyDyxoBIlPkZByQqkxsB4lffBMNordzHCNOhUZAYqqcQ11QaEJCv1PUGkyov4FgaCM2M2mrTNLScRZBsg15kdzx78KAPtWpvjlCtgN77ZAkX1ZB7XkDv7sZA9ZASpH91YSAdcmnYYTCo5yZBUzDoi1zZCY9FD8gK8E3LzXllONDAvw2zIYfTLZA6LpLZB6zspCpZAP5HTPKOVEL'
        };
        chai.request(server)
            .post('/api/user/login/facebook')
            .set('Content-Type', 'application/json')
            .send(login)
            .end((err, res) => {
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(true);
									res.body.user.should.have.property('facebookId').eql('118812825799125');
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
