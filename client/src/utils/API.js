import axios from 'axios'
const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q='
const apiKey = '&key=AIzaSyBnwnrcNwOsL8hcsCgR-0LE-pyvCDE0s5I'

export default {
  // Gets all books
  getBooks: function () {
    return axios.get('/api/books')
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get('/api/books/' + id)
  },
  // Saves a book to the database
  saveBook: function (id) {
    return axios.post('/api/books/' + id)
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete('/api/books/' + id)
  },
  searchGoogle: function (query) {
    let theQuery = ''
    const theTitle = query.title.trim();
    const theAuthor = query.author.trim();
    const theSubject = query.subject.trim();
    if (theTitle) {
      theQuery = 'intitle:' + theTitle.split(' ').join('+');
    }
    if (theAuthor) {
      if (theQuery) { theQuery += '+' };
      theQuery += 'inauthor:' + theAuthor.split(' ').join('+');
    }
    if (theSubject) {
      if (theQuery) { theQuery += '+' };
      theQuery += 'subject:' + theSubject.split(' ').join('+');
    }
    console.log(theQuery);
    return axios.get(baseUrl + theQuery + apiKey)
  }
}