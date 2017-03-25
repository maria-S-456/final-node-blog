A blogging app that demonstrates adding, deleting, editing, and posting to and from a database on a remote mongo database. All operations work, except editing through html page. Password and username have been removed.

blog-test.js has a GET test that is not yet working. (passes even when wrong)

UPDATE: blog-test is testing GET correctly now. gets timeout error if run without "mocha -t 10000 blog-test.js"