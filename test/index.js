const chai        = require('chai');
const landing      = require('./landing.test');
const user      = require('./user.test');
const chaiHttp = require('chai-http');
const server =  require('../');

chai.should();
chai.use(chaiHttp);



describe('Nexus API test', () => {

  describe('/GET api', () => {
      it('it should GET the api version', (done) => landing(done,chai,server));
  });

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
      it('it should register new user', (done) => user.registerSuccess(done,chai,server));
  });

  describe('/POST /api/user/login', () => {
      it('it should login the just registered user', (done) => user.loginSuccess(done,chai,server));
  });

  describe('/GET /api/user', () => {
      it('it should return the profile of the just registered user', (done) => user.getSuccess(done,chai,server));
  });

  describe('/GET /api/user', () => {
      it('it should fail : inccorect token ', (done) => user.getFail1(done,chai,server));
  });

  describe('/DELETE /api/user', () => {
      it('it should delete registered user', (done) => user.deleteSuccess(done,chai,server));
  });

  describe('/DELETE /api/user', () => {
      it('it should fail : inccorect token', (done) => user.deletefail1(done,chai,server));
  });

});