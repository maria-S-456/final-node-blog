
var blogTemplate = (
  '<li class="js-blog-post">' +
    '<p><span class="blog-post js-blog-post-name"></span></p>' +

    '<p><span class="author js-author">This is where the author will go.</span></p>' +

    '<p><span class="content js-content">This is where content will go.</span></p>' +

    '<div class="blog-post-controls">' +

      '<button class="js-blog-post-edit">' + '<span class="edit-button-label">Edit</span>' +

   
      '<button class="js-blog-post-delete">' +
        '<span class="button-label">delete</span>' +

      '</button>' +
    '</div>' +
  '</li>'
);

var BLOG_URL = '/blog'; 


function getAndDisplayBlog() {
  console.log('Retrieving blogs');
  $.getJSON(BLOG_URL, function(items) {
    console.log('Rendering blogs');
    var itemElements = items.map(function(item) {
      var element = $(blogTemplate);
      element.attr('id', item.id);
      var itemName = element.find('.js-blog-post-name');
      var authorName = element.find('.js-author');
      var blogContent = element.find('.js-content');
      itemName.text(item.title);
      authorName.text(item.author);
      blogContent.text(item.content);

      return element
    });
    $('.js-blog').html(itemElements);
  });
}

function addBlogPost(item) {
  console.log('Adding blog post: ' + item);
  $.ajax({
    method: 'POST',
    url: BLOG_URL,
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayBlog();
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function deleteBlogPost(itemId) {
  console.log('Deleting blog post `' + itemId + '`');
  $.ajax({
    url: BLOG_URL + '/' + itemId,
    method: 'DELETE',
    success: getAndDisplayBlog
  });
}

function handleBlogPostAdd() 

{

  $('#js-blog-form').submit(function(e) {
    e.preventDefault();
    addBlogPost({
      title: $(e.currentTarget).find('#js-new-title').val(),
      author: $(e.currentTarget).find('#js-new-author').val(),
      content: $(e.currentTarget).find('#js-new-content').val()
    });
  });

}
function handleBlogPostDelete() {
  $('.js-blog').on('click', '.js-blog-post-delete', function(e) {
    e.preventDefault();
    deleteBlogPost(
      $(e.currentTarget).closest('.js-blog-post').attr('id'));
  });
}

$(function() {
  getAndDisplayBlog();
  handleBlogPostAdd();
  handleBlogPostDelete();
});
