import { getSingleBook, deleteBook, getBooksByAuthor } from './bookData';
import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';

// for merged promises
// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
  // GET AUTHOR
  // Create an object that has book data and an object named authorObject
});

const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((authorObject) => {
    getAuthorBooks(authorObject.firebaseKey).then((authorBooksArray) => resolve({ ...authorObject, authorBooksArray }));
  }).catch(reject);
});

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getBooksByAuthor(firebaseKey).then((booksArray) => {
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));
    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  })
    .catch(reject);
});

export { getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship };
