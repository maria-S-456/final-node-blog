/*
var chai = require('chai');
var chaiHTTP = require('chai-http'); //added this without line 3, "chai.request is not a function"
chai.use(chaiHTTP);
var util = require('util');

//var expect = chai.expect; //added this, no difference
var mongoose = require('mongoose');
const should = chai.should();

/*
var port = 8000;
var {DATABASE_URL, TEST_DATABASE_URL} = require('../config.js');
var {blogPost} = require('../models.js');
var {app} = require('../server.js');

describe('GET endpoint', function(){
	let res;
	return chai.request(app).get('/blog').then(_res => {
		res = _res;
		res.should.have.length.of.at.least(1);

		return blogPost.count();
	}).then(count => {
		res.body.should.have.length.of(count);
	});
});
*/

var should = require('should');
var request = require('request');
var expect = require('chai').expect;
var {DATABASE_URL, TEST_DATABASE_URL} = require('../config.js');
var util = require('util');

describe('returns `still believing`', function(){
	it('returns `still believing`', function(done){
		request.get({url:DATABASE_URL}, function(error, response, body){
				expect(response.statusCode).to.equal(200);
				console.log(body);
			done();
		});
	});
});