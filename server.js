var express = require('express');
var mongoose = require('mongoose');
var app = express();

var db = mongoose.connect('mongodb://<dbusername>:<password>@ds135790.mlab.com:35790/blog-data');
var blogs = require('./models.js');

var port = 8000;

app.use(express.static('public')); //make sure this line is here, otherwise api will not render to html


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/blog', function(req, res){
	blogs.find(function(err, data){
		if(err){
			res.status(500).send(err);
		}
		else{
			res.json(data);
		}

	});
});

app.listen(port, function(){
	console.log('Listening to port 8000');
})

/*
const express = require('express');
const morgan = require('morgan');

const app = express();

const blogRouter = require('./blogRouter');

// log the http layer
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/blog', blogRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
*/
