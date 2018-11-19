const chai        = require('chai');
const landing      = require('./landing.test');
const user      = require('./user.test');
const image      = require('./image.test');
const task      = require('./task.test');
const matching      = require('./matching.test');
const chaiHttp = require('chai-http');
const server =  require('../');

chai.should();
chai.use(chaiHttp);



describe('Nexus API test', async () => {

  //Landing
  describe('/GET api', () => {
      it('it should GET the api version', (done) => landing(done,chai,server));
  });

  //Users
  describe('/POST /api/user/login', () => {
      it('it should fail : missing payload', (done) => user.loginFail1(done,chai,server));
  });

  describe('/POST /api/user/login', () => {
      it('it should fail : incorrect email format', (done) => user.loginFail2(done,chai,server));
  });

  describe('/POST /api/user/login', () => {
      it('it should fail : missing password', (done) => user.loginFail3(done,chai,server));
  });

  describe('/POST /api/user/login', () => {
      it('it should fail : unregistered user', (done) => user.loginFail4(done,chai,server));
  });

  describe('/POST /api/user', () => {
      it('it should fail : missing email', (done) => user.registerFail1(done,chai,server));
  });

  describe('/POST /api/user', () => {
      it('it should fail : missing password', (done) => user.registerFail2(done,chai,server));
  });

  describe('/POST /api/user', () => {
      it('it should fail : inccorect email format', (done) => user.registerFail3(done,chai,server));
  });

  describe('/POST /api/user', () => {
      it('it should register new user 1', (done) => user.registerSuccess(done,chai,server));
  });

  describe('/POST /api/user', () => {
      it('it should register new user 2', (done) => user.registerSuccess2(done,chai,server));
  });

  describe('/POST /api/user/login', () => {
      it('it should login the just registered user 1', (done) => user.loginSuccess(done,chai,server));
  });

  describe('/POST /api/user/login', () => {
      it('it should login the just registered user 2', (done) => user.loginSuccess2(done,chai,server));
  });

  describe('/GET /api/user', () => {
      it('it should return the profile of the just registered user', (done) => user.getSuccess(done,chai,server));
  });

  describe('/GET /api/user', () => {
      it('it should fail : inccorect token ', (done) => user.getFail1(done,chai,server));
  });

  describe('/PUT /api/user', () => {
      it('it should update the user ', (done) => user.putSuccess(done,chai,server));
  });

  describe('/PUT /api/user', () => {
      it('it should fail : blacklisted property entered ', (done) => user.putFail1(done,chai,server));
  });

  describe('/PUT /api/user', () => {
      it('it should fail : email alreadt exists', (done) => user.putFail2(done,chai,server));
  });

  describe('/DELETE /api/user', () => {
      it('it should delete registered user 1', (done) => user.deleteSuccess(done,chai,server));
  });

  describe('/DELETE /api/user', () => {
      it('it should delete registered user 2', (done) => user.deleteSuccess2(done,chai,server));
  });

  describe('/DELETE /api/user', () => {
      it('it should fail : inccorect token', (done) => user.deletefail1(done,chai,server));
  });

  //Images
  describe('/POST /api/user', () => {
      it('it should register a new user', (done) => image.registerSuccess(done,chai,server));
  });

  describe('/POST /api/user/login', () => {
      it('it should login new user', (done) => image.loginSuccess(done,chai,server));
  });

  describe('/POST /api/user/image', () => {
      it('it should upload image to user', (done) => image.uploadImageSuccess(done,chai,server));
  });

  describe('/PUT /api/user/image', () => {
      it('it should update user image', (done) => image.changeImageSuccess(done,chai,server));
  });

  describe('/GET /api/user/image', () => {
      it('it should get user image', (done) => image.getImageSuccess(done,chai,server));
  });

  describe('/DELETE /api/user', () => {
      it('it should delete registered user', (done) => image.deleteSuccess(done,chai,server));
  });
  describe('/POST /api/user', () => {
      it('it should register a new user', (done) => image.registerSuccess(done,chai,server));
  });


  //TASKS
  describe('/POST /api/user', () => {
      it('it should register a new user', (done) => task.registerSuccess(done,chai,server));
  });

  describe('/POST /api/user/login', () => {
      it('it should login new user', (done) => task.loginSuccess(done,chai,server));
  });

  describe('/POST /api/user/task', () => {
      it('it should fail incomplete task body', (done) => task.createTaskFail1(done,chai,server));
  });
  describe('/POST /api/user/task', () => {
      it('it should create a task and insert into user', (done) => task.createTaskSuccess(done,chai,server));
  });

  describe('/GET /api/user/task', () => {
      it('it should get all of the user tasks', (done) => task.getTaskSuccess(done,chai,server));
  });

  describe('/DELETE /api/user', () => {
      it('it should delete registered user', (done) => task.deleteSuccess(done,chai,server));
  });


    //Matching
     describe('/POST /api/user', () => {
    it('it should register new user 1', (done) => matching.registerUser1(done,chai,server));
    });

     describe('/POST /api/user', () => {
    it('it should register new user 2', (done) => matching.registerUser2(done,chai,server));
    });

     describe('/POST /api/user/login', () => {
        it('it should login the just registered user 1', (done) => matching.loginUser1(done,chai,server));
    });
  
     describe('/POST /api/user/login', () => {
        it('it should login the just registered user 2', (done) => matching.loginUser2(done,chai,server));
    });

     describe('/PUT /api/user', () => {
        it('it should update the user ', (done) => matching.putUser1(done,chai,server));
    });

     describe('/PUT /api/user', () => {
        it('it should update the user ', (done) => matching.putUser2(done,chai,server));
    });

     describe('/GET /api/user', () => {
        it('should pass ', (done) => matching.getUser1(done,chai,server));
    });

     describe('/GET /api/user', () => {
        it('should pass ', (done) => matching.getUser2(done,chai,server));
    });

    describe('/GET /api/user', () => {
        it('should pass ', (done) =>   matching.popconn(done,chai,server));
    });


      describe('/GET /api/user', () => {
        it('should pass ', (done) => matching.getUser2(done,chai,server));
    });
    
    describe('/GET /api/user', () => {
        it('should pass ', (done) =>  matching.getpotcon(done,chai,server));
    });
    

    describe('/GET /api/user', () => {
        it('should pass ', (done) => matching.getUser1(done,chai,server));
    });

    describe('/PUT /api/user', () => {
        it('it should update the user ', (done) => matching.putLike1(done,chai,server));
    });
    describe('/PUT /api/user', () => {
        it('it should update the user ', (done) => matching.putLike3(done,chai,server));
    });

    describe('/PUT /api/user', () => {
        it('it should update the user ', (done) => matching.putLike2(done,chai,server));
    });

    describe('/PUT /api/user', () => {
        it('it should update the user ', (done) => matching.putDislike(done,chai,server));
    });

    describe('/GET /api/user', () => {
        it('should pass ', (done) => matching.getUserByID(done,chai,server));
    });

      
    describe('/GET /api/user', () => {
        it('should pass ', (done) =>  matching.popconn1(done,chai,server));
    });

});



