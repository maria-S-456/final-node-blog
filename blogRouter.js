const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPost} = require('./models');

// we're going to add some items to ShoppingList
// so there's some data to look at
BlogPost.create("First Post","Maria Mohl",'We are swept away back to a time when a found coin, stick or rock could be a wondrous experience. To a time before huge grocery stores and department stores filled with plastic distractions. To a time when we were still close to the ground in age, size, and interest, pondering over the found wonders around us, evaluating the “magic” and usefulness in each one.');
BlogPost.create("Still Believing","Anne Frank", "It’s a wonder I haven’t abandoned all my ideals, they seem so absurd and impractical. Yet I cling to them because I still believe, in spite of everything, that people are truly good at heart. It’s utterly impossible for me to build my life on a foundation of chaos, suffering and death. I see the world being slowly transformed into a wilderness, I hear the approaching thunder that, one day, will destroy us too, I feel the suffering of millions. And yet, when I look up at the sky, I somehow feel that everything will change for the better, that this cruelty too shall end, that peace and tranquility will return once more");
BlogPost.create("Unfolding of Wings", "C. JoyBell C.", "I have come to accept the feeling of not knowing where I am going. And I have trained myself to love it. Because it is only when we are suspended in mid-air with no landing in sight, that we force our wings to unravel and alas begin our flight. And as we fly, we still may not know where we are going to. But the miracle is in the unfolding of the wings. You may not know where you're going, but you know that so long as you spread your wings, the winds will carry you.");


// when the root of this router is called with GET, return
// all current ShoppingList items
router.get('/', (req, res) => {
  res.json(BlogPost.get());
});


// when a new shopping list item is posted, make sure it's
// got required fields ('name' and 'checked'). if not,
// log an error and return a 400 status code. if okay,
// add new item to ShoppingList and return it with a 201.
router.post('/', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['title', 'author', 'content'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPost.create(req.body.title, req.body.author, req.body.content);
  res.status(201).json(item);
});


// when DELETE request comes in with an id in path,
// try to delete that item from ShoppingList.
router.delete('/:id', (req, res) => {
  BlogPost.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});

// when PUT request comes in with updated item, ensure has
// required fields. also ensure that item id in url path, and
// item id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `ShoppingList.update` with updated item.
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'author', 'content', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\``);
  const updatedItem = BlogPost.update({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    id: req.params.id
  });
  res.status(204).json(updatedItem);
})

module.exports = router;