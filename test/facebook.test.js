
//Dummy user 1
var dummyUser = {};

module.exports.loginSuccessfb = (done,chai,server) => {
		let login = {
              access_token: 'EAARWTKVTjFgBAEzC1hi3Bzy9WWwZBuW5dkjoNBJXdOHZAsGf6jjZADbntninJiaj1Ovid7ddHjML51jYIV4DWKS4iYfrpw35HssSz7kn4mlxZAoDonwXPTUVCAaiJamHXXMZCJ0lP5WhYWmKGifFzzdmNPb6u0LU74FidNqDEXQnnmZCedPmbgVnrfaZABQ0JkWvg8ZCZAc3vlTlTiZBDMgnPnMIy9RPtEltGYDmzL6GreV2xrWCNWjrBh'
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
