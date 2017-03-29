const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();
const assert = require('assert');
const expect = chai.expect;
const {app, runServer, closeServer} = require('../server.js'); //without this, it will say "app is not defined"


const chaiHTTP = require('chai-http'); //without these, you will get "chai.request is not a function" error
chai.use(chaiHTTP);

//describe a block of tests
describe('Test RESTful api', function(){

//WORKING
//need to run mocha with "mocha -t 10000 blog-test.js" to avoid the timeout error
it('should make a /GET request', function(done){
	chai.request(app).get('/blog').end(function(err, res){
		res.should.be.json;
		res.should.have.status(200);
		 //6 is number of documents in your database
		done();
		});
		//done(); //this will always pass if done() is placed here
	});


it('should make a /POST request', function(done){

const newBlog = {"title":"My Adventures in Timbuktu", "author":"Steven Spielberg", "content":"As I arrived, the most fantastic thing happened..."};

	chai.request(app).post('/blog').send(newBlog)
	.end(function(err, res){

		res.should.have.status(201);
		res.should.be.json;
		res.should.be.a('object');
		//newBlog.title.should.equal("My Adventures in Timbuktu");
		//done should not be here!
		});
		done();
	});


it('should make a /PUT request', function(done){
	chai.request(app).get('/blog').end(function(err,res){
		chai.request(app).put(`/blog/'${res.body[5].id}`).send({"author": "Maria"}).end(function(err, res){
			res.should.have.status(201);
			res.should.be.a('object');
			res.should.be.json;
			//chai.request(app).put('/blog' + res.body[0].id).send({title: 'Anne Frank'});
			//done();
		});
		done();
	});
	//done();
});

it('should make a /DELETE request', function(done){
	chai.request(app).get('/blog').end(function(err,res){
		chai.request(app).delete(`/blog/'${res.body[5].id}`).end(function(err,res){
			res.should.have.status(204);
		});
		//done();
	});
	done();
}); 

});