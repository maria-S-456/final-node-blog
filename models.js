var mongoose = require('mongoose');

Schema = mongoose.Schema;

var blogModel = new Schema({
  title:{type:String, required: true},
  author:{type:String, required: true},
  content:{type:String, required: true}
});

module.exports = mongoose.model('blog', blogModel, 'blogPosts');


/*
const uuid = require('uuid');

function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const BlogPost = {
  create: function(title, author, content) {
    console.log('Creating new blog post');
    const item = {
      title:title,
      author:author,
      content:content,
      id: uuid.v4()
    };
    this.items[item.id] = item;
    return item;
  },
  get: function() {
    console.log('Retrieving blog posts');
    return Object.keys(this.items).map(key => this.items[key]);
    },
  delete: function(id) {
    console.log(`Deleting blog post \`${id}\``);
    delete this.items[id];
  },
  update: function(updatedItem) {
    console.log(`Updating blog post item \`${updatedItem.id}\``);
    const {id} = updatedItem;
    if (!(id in this.items)) {
      throw StorageException(
        `Can't update item \`${id}\` because doesn't exist.`)
    }
    this.items[updatedItem.id] = updatedItem;
    return updatedItem;
  }
};

function createBlogPost() {
  const storage = Object.create(BlogPost);
  storage.items = {};
  return storage;
}

module.exports = {
  BlogPost: createBlogPost() 
}

*/