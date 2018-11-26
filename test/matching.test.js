
//Dummy user 1
var emailCreated = "user1aawfawfaf21awfawfaafafawf"+Date.now()+"@12345test.com";
var passwordCreated = "test123";
var dummyUser = {};

//Dummy user 2
var emailCreated2 = "user2awf123"+Date.now()+"@12345test.com";
var passwordCreated2 = "test123";
var dummyUser2 = {};

//Register User 1
module.exports.registerUser1 = (done,chai,server) => {
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


//Register User 2
module.exports.registerUser2 = (done,chai,server) => {
    let register = {
          email: emailCreated2,
          password: passwordCreated2,
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



//login user 1
module.exports.loginUser1 = (done,chai,server) => {
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


//login user 2
module.exports.loginUser2 = (done,chai,server) => {
    let register = {
          email: emailCreated2,
          password: passwordCreated2
    };
    chai.request(server)
        .post('/api/user/login')
        .set('Content-Type', 'application/json')
        .send(register)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
              dummyUser2 = res.body;
          done();
        });
};




//Put User 1
module.exports.putUser1 = (done,chai,server) => {
    let newDetails = {
          firstName: 'DummyNewName',
          interests : ['IA', 'IB', 'IC'],
          lookingFor : ['LB','LC','LD'],
          industry : ['INA','INB','INC']
    };
    chai.request(server)
        .put('/api/user')
        .set('Content-Type', 'application/json')
                    .set('Authorization',dummyUser.token)
        .send(newDetails)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
            
          done();
        });
};

//Put User 2
module.exports.putUser2 = (done,chai,server) => {
    let newDetails = {
          firstName: 'DummyNewName2',
        interests : ['IA', 'IB', 'IC'],
        lookingFor : ['LB','LC','LD'],
        industry : ['INA','INB','INC']
    };
    chai.request(server)
        .put('/api/user')
        .set('Content-Type', 'application/json')
                    .set('Authorization',dummyUser2.token)
        .send(newDetails)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
             
          done();
        });
};

module.exports.getUser1 = (done,chai,server) => {

    chai.request(server)
        .get('/api/user')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser.token)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
             
              res.body.should.have.property('user').have.property('email').eql(dummyUser.user.email);
              res.body.should.have.property('user').have.property('interests').include('IA');
              res.body.should.have.property('user').have.property('interests').include('IB');
              res.body.should.have.property('user').have.property('interests').include('IC');
          done();
        });
};

module.exports.getUser2 = (done,chai,server) => {

    chai.request(server)
        .get('/api/user')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser2.token)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
              res.body.should.have.property('user').have.property('email').eql(dummyUser2.user.email);
              res.body.should.have.property('user').have.property('interests').include('IA');
              res.body.should.have.property('user').have.property('interests').include('IB');
              res.body.should.have.property('user').have.property('interests').include('IC');
          done();
        });
};

//Test populate connections
module.exports.popconn = (done,chai,server) => {
    chai.request(server)
        .get('/api/user/popconn')
        .set('Content-Type', 'application/json')
        .set('Authorization', dummyUser2.token)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
              done();
        });
        
};


//Test populate connections
module.exports.getpotcon = (done,chai,server) => {

    chai.request(server)
        .get('/api/user/getpotconn')
        .set('Content-Type', 'application/json')
        .set('Authorization', dummyUser2.token)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
          done();
        });
};


// /api/user/getuser


//Put User 1
module.exports.putLike1 = (done,chai,server) => {
    let newDetails = {
        liked: [ dummyUser2.user._id ]
    };
   
    chai.request(server)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser.token)
        .send(newDetails)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
          done();
        });
};


//Put User 1
module.exports.putLike2 = (done,chai,server) => {
    let newDetails = {
        liked: [ dummyUser.user._id ]
    };
    
    chai.request(server)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser2.token)
        .send(newDetails)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
          done();
        });
};


//Put User 1
module.exports.putLike3 = (done,chai,server) => {
    let newDetails = {
        liked: [ dummyUser._id ]
    };
    chai.request(server)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser2.token)
        .send(newDetails)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
          done();
        });
};


//Put User 1
module.exports.putDislike = (done,chai,server) => {
    let newDetails = {
        disliked: [ dummyUser2.user._id ]
    };
    
    chai.request(server)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser.token)
        .send(newDetails)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
          done();
        });
};



//Test populate connections
module.exports.getUserByID = (done,chai,server) => {
    chai.request(server)
        .get('/api/user/getuser/?id=' + dummyUser2.user._id)
        .set('Content-Type', 'application/json')
        .set('Authorization', dummyUser.token)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
          done();
        });
};



//Test populate connections
module.exports.popconn1 = (done,chai,server) => {
    chai.request(server)
        .get('/api/user/popconn')
        .set('Content-Type', 'application/json')
        .set('Authorization', dummyUser.token)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
              done();
        });  
};



//Test matching already matched Users
module.exports.matchInvalidID = (done,chai,server) => {
    let newDetails = {
        id: "leet hx04"
    };
    chai.request(server)
        .put('/api/user/match')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser.token)
        .send(newDetails)
        .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(false);
          done();
        });
};




//Test matching already matched Users
module.exports.matchAlreadyMatched = (done,chai,server) => {
    let newDetails = {
        id: dummyUser2.user._id
    };
    chai.request(server)
        .put('/api/user/match')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser.token)
        .send(newDetails)
        .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(false);
          done();
        });
};



//Test matching already matched Users
module.exports.matchToMyself = (done,chai,server) => {
    let newDetails = {
        id: dummyUser.user._id
    };
    chai.request(server)
        .put('/api/user/match')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser.token)
        .send(newDetails)
        .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(false);
          done();
        });
};


//Test delete user
module.exports.deleteUser1 = (done,chai,server) => {
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
module.exports.deleteUser2 = (done,chai,server) => {
        chai.request(server)
            .delete('/api/user')
            .set('Content-Type', 'application/json')
            .set('Authorization',dummyUser2.token)
            .end((err, res) => {
                  res.should.have.status(204);
              done();
            });
};



//Register User 1
module.exports.registerUser3 = (done,chai,server) => {
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


//Register User 2
module.exports.registerUser4 = (done,chai,server) => {
    let register = {
          email: emailCreated2,
          password: passwordCreated2,
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



//login user 1
module.exports.loginUser3 = (done,chai,server) => {
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


//login user 2
module.exports.loginUser4 = (done,chai,server) => {
    let register = {
          email: emailCreated2,
          password: passwordCreated2
    };
    chai.request(server)
        .post('/api/user/login')
        .set('Content-Type', 'application/json')
        .send(register)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
              dummyUser2 = res.body;
          done();
        });
};

//Put User 1
module.exports.pute3 = (done,chai,server) => {
    let newDetails = {
        ie :  2,
        ine : 4,
        lfe : 3,
        interests : ['IA', 'IB', 'IC'],
        lookingFor : ['LB','LC','LD'],
        industry : ['INA','INB','INC']
    };
    chai.request(server)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser.token)
        .send(newDetails)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
          done();
        });
};

//Put User 1
module.exports.pute4 = (done,chai,server) => {
    let newDetails = {
        ie :  2,
        ine : 4,
        lfe : 3,
        interests : ['IA', 'IB', 'IC'],
        lookingFor : ['LB','LC','LD'],
        industry : ['INA','INB','INC']
    };
    chai.request(server)
        .put('/api/user')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser2.token)
        .send(newDetails)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
          done();
        });
};



//Test populate connections
module.exports.popconn3 = (done,chai,server) => {
    chai.request(server)
        .get('/api/user/popconn')
        .set('Content-Type', 'application/json')
        .set('Authorization', dummyUser.token)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
              done();
        });  
};


//Test populate connections
module.exports.popconn4 = (done,chai,server) => {
    chai.request(server)
        .get('/api/user/popconn')
        .set('Content-Type', 'application/json')
        .set('Authorization', dummyUser2.token)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
              done();
        });  
};






//Test matching already matched Users
module.exports.matchSuccess = (done,chai,server) => {
    let newDetails = {
        id: dummyUser2.user._id
    };
    chai.request(server)
        .put('/api/user/match')
        .set('Content-Type', 'application/json')
        .set('Authorization',dummyUser.token)
        .send(newDetails)
        .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(true);
          done();
        });
};


//Test delete user
module.exports.deleteUser3 = (done,chai,server) => {
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
module.exports.deleteUser4 = (done,chai,server) => {
        chai.request(server)
            .delete('/api/user')
            .set('Content-Type', 'application/json')
            .set('Authorization',dummyUser2.token)
            .end((err, res) => {
                  res.should.have.status(204);
              done();
            });
};















