const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();
const assert = require('assert');
const expect = chai.expect;
const {app, runServer, closeServer} = require('../server.js'); //without this, it will say "app is not defined"


const chaiHTTP = require('chai-http'); //without these, you will get "chai.request is not a function" error
chai.use(chaiHTTP);

//describe a block of tests
describe('demo tests', function(){

it('adds two numbers together', function(){
		assert(2 + 3 === 5);
	});

//WORKING
//need to run mocha with "mocha -t 10000 blog-test.js" to avoid the timeout error
it('should make a /GET request', function(done){
	chai.request(app).get('/blog').end(function(err, res){
		res.should.be.json;
		res.should.have.status(200);
		expect(res.body).to.have.lengthOf(6); //6 is number of documents in your database
		done();
		});
		//done(); this will always pass if done() is placed here
	});

it('should make a /POST request', function(done){
	chai.request(app).get('/blog').send({'title':'My Adventures in Timbuktu', 'Author':'Steven Spielberg', 'Content':'As I arrived, the most fantastic thing happened...'})
	.end(function(err, res){
		res.should.have.status(200);
		done();
	})
})
});