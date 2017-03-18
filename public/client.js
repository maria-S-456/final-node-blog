
var shoppingItemTemplate = (
  '<li class="js-shopping-item">' +
    '<p><span class="shopping-item js-shopping-item-name"></span></p>' +

    '<p><span class="author js-author">This is where the author will go.</span></p>' +

    '<p><span class="content js-content">This is where content will go.</span></p>' +

    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);

var SHOPPING_LIST_URL = '/shopping-list';
var BLOG_URL = '/blog'; 

function getAndDisplayShoppingList() {
  console.log('Retrieving shopping list');
  $.getJSON(BLOG_URL, function(items) {
    console.log('Rendering shopping list');
    var itemElements = items.map(function(item) {
      var element = $(shoppingItemTemplate);
      element.attr('id', item.id);
      var itemName = element.find('.js-shopping-item-name');
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

function addShoppingItem(item) {
  console.log('Adding shopping item: ' + item);
  $.ajax({
    method: 'POST',
    url: BLOG_URL,
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayShoppingList();
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function deleteShoppingItem(itemId) {
  console.log('Deleting shopping item `' + itemId + '`');
  $.ajax({
    url: BLOG_URL + '/' + itemId,
    method: 'DELETE',
    success: getAndDisplayShoppingList
  });
}

function updateShoppingListitem(item) {
  console.log('Updating shopping list item `' + item.id + '`');
  $.ajax({
    url: SHOPPING_LIST_URL + '/' + item.id,
    method: 'PUT',
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayShoppingList()
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}


function handleShoppingListAdd() {

  $('#js-blog-form').submit(function(e) {
    e.preventDefault();
    addShoppingItem({
      title: $(e.currentTarget).find('#js-new-title').val(),
      author: $(e.currentTarget).find('#js-new-author').val(),
      content: $(e.currentTarget).find('#js-new-content').val()
    });
  });

}
function handleShoppingListDelete() {
  $('.js-blog').on('click', '.js-shopping-item-delete', function(e) {
    e.preventDefault();
    deleteShoppingItem(
      $(e.currentTarget).closest('.js-shopping-item').attr('id'));
  });
}


$(function() {
  getAndDisplayShoppingList();
  handleShoppingListAdd();
  handleShoppingListDelete();
});
