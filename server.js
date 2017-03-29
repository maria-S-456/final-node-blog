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

module.exports = {app, runServer, closeServer};

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
