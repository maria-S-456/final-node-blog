const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();
const assert = require('assert');
const {app, runServer, closeServer} = require('../server.js'); //without this, it will say "app is not defined"


const chaiHTTP = require('chai-http'); //without these, you will get "chai.request is not a function" error
chai.use(chaiHTTP);

//describe a block of tests
describe('demo tests', function(){

it('adds two numbers together', function(){
		assert(2 + 3 === 5);
	});

it('should make a /GET request', function(done){
	chai.request(app).get('/blog').end(function(err, res){
		res.should.be.json;
		res.should.have.status(201);
		expect(res.body).to.have.lengthOf(3);
		});
		done();
	});


});