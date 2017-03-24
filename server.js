/*
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://Emily:rug77hen@ds135790.mlab.com:35790/blog-data'); //CHANGE UN AND PW TO WORK!!
var blogPosts = require('./models.js');


//var blogPosts = require('./models.js');

var port = 8000;

app.use(express.static('public')); //make sure this line is here, otherwise api will not render to html


//going to localhost:8000 will bring you to html page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});	

//going to localhost:8000/blog will bring you to the api


original. WORKS

app.get('/blog', function(req, res){
	blogPosts.find(function(err, data){
		if(err){
			res.status(500).send(err);
		}
		else{
			res.json(data);
		}
	});
});



app.get('/blog', function(req, res) =>{
	blogPost.find().exec().then(blog => {
		res.json(posts.map(post => post.apiRepr()));
	}).catch(err =>{
		res.status(500).json({error: 'could not GET'});
	});
});




app.post('/blog', jsonParser, (req, res) => {
  
  const requiredFields = ['title', 'author', 'content'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = blogPosts.create(req.body.title, req.body.author, req.body.content, function(err){
  	if(err){
  		console.log('Error', err);
  	}
  });

  res.status(201).json(item);
});



app.get('/blog', function(req, res){
	blogPosts.find().exec().then(posts => {
		res.json(blogPosts.map(myPost => myPost.apiRepr()));
	}).catch(err => {
		console.error(err);
		res.status(500).json({error: `Couldn't GET api data`});
	});
});


app.post('/blog', function(req, res){
	const requiredFields = ['title', 'content', 'author'];
	for(var i=0; i< require.length; i++){
		var field = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

blogPosts
    .create({
      title: req.body.title,
      author: req.body.author,
      content: req.body.content
    })
    .then(blogPosts => res.status(201).json(blogPosts.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});

*/





var server;

const bodyParser = require('body-parser');
const express = require('express');
var mongoose = require('mongoose');
const morgan = require('morgan');

const {DATABASE_URL} = require('./config.js');
const blogPosts = require('./models');

const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
var db = mongoose.connect(DATABASE_URL); //CHANGE UN AND PW TO WORK!!


//app.use('/blog', blogRouter);

// log the http layer



app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/blog', function(req, res) {
	blogPosts.find().exec().then(blogs => {
		res.json(blogs.map(blog =>blog.apiRepr()));
	}).catch(err => {
		console.error(err);
		res.status(500).json({error: 'GET failed'});
	});
});

//WORKING
app.get('/blog/:id', function(req, res){
  blogPosts
    .findById(req.params.id)
    .exec()
    .then(blog => res.json(blog.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'get failed again'});
    });
});


//WORKING
app.post('/blog', function(req, res){
	const requiredFields = ['title', 'author', 'content'];
	for(var i=0; i< requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	blogPosts.create({
		title: req.body.title,
		author: req.body.author,
		content: req.body.content
	})
	.then(myBlog => res.status(201).json(myBlog.apiRepr())).catch(err => { console.error(err);
		res.status(500).json({error: 'Failed making new blog'});
		});
});


//WORKING
app.delete('/blog/:id', function(req, res){
	blogPosts.findByIdAndRemove(req.params.id).exec().then(() =>{
		res.status(204).json({message: 'hooray!'});
	}).catch(err => {
		console.error(err);
		res.status(500).json({error: 'Failed to delete'});
	});
});

app.put('/blog/:id', (req, res) => {
	if(!(req.params.id === req.body.id)) {
		res.status(400).json({
			error: 'Request path id and request body id values must match'
		});
	}

	const addedFields = {};
	const blogFields = ['title', 'author', 'content'];
	blogFields.forEach(field => {
		if(field in req.body) {
			addedFields[field] = req.body[field];
		}
	});

	blogPosts.findByIdAndUpdate(req.params.id, {$set: addedFields}, {new: true})
	.exec().then(newPost => res.status(201).json(newPost.apiRepr())).catch(err => res.status(500).json({message: 'Update error'}));
});

//second delete for some reason

app.use('*', function(req, res){
	res.status(404).json({message: 'not found'});
});

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log('App is listening on port ${port}');
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

 //get blog by id



app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
