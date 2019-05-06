import axios from 'axios'

import * as io from 'socket.io-client'
const socket = io()

const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q='
const apiKey = '&key=AIzaSyBnwnrcNwOsL8hcsCgR-0LE-pyvCDE0s5I'

export default {
  getBooks: function () {
    return axios.get('/api/books')
  },
  getBook: function (id) {
    return axios.get('/api/books/' + id)
  },
  saveBook: function (id) {
    let theUrl = 'https://www.googleapis.com/books/v1/volumes/' + id
    axios.get(theUrl)
      .then(function (response) {
        const id = response.data.id;
        const { title, authors, description, previewLink } = response.data.volumeInfo;
        const thumbnail = response.data.volumeInfo.imageLinks.thumbnail;
        socket.emit('chat message', `*** <em>${title}</em> was just added to Saved ***`);
        return axios.post('/api/books', {
          id,
          title,
          authors,
          description,
          previewLink,
          thumbnail
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  },
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
    return axios.get(baseUrl + theQuery + apiKey)
  }
}