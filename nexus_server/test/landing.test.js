module.exports = (done,chai,server) => {

        chai.request(server)
            .get('/api')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Nexus REST API');
                  res.body.should.have.property('version').eql('v1.0.0');
              done();
            });
      
};