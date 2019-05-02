import React, { Component } from 'react';
import API from '../utils/API';
import BtnView from '../components/BtnView';
import BtnSave from '../components/BtnSave';
import { List, ListItem } from '../components/List';
import { Input, TextArea, FormBtn } from '../components/Form';

//User can search for books via the Google Books API and render them here. User has the option to 'View' a book, bringing them to the book on Google Books, or 'Save' a book, saving it to the Mongo database.

class Search extends Component {
  state = {
    books: [],
    title: '',
    author: '',
    subject: ''
  };

  componentDidMount () {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title || this.state.author || this.state.subject) {
      API.searchGoogle({
        title: this.state.title,
        author: this.state.author,
        subject: this.state.subject
      })
        .then(res => {
          let books = [];
          res.data.items.forEach((element, i) => {
            let id = '', title = '', authors = '', booklink = '', bookimg = '', synopsis = '';
            if (element.id) {
              if ('etag' in element) {
                id = element.id + element.etag;
              }
            }
            if (element.volumeInfo.title) {
              title = element.volumeInfo.title;
            }
            if (element.volumeInfo.authors) {
              authors = ' by ' + (element.volumeInfo.authors).join(', ');
            }
            if (element.volumeInfo.infoLink) {
              booklink = element.volumeInfo.infoLink;
            }
            if ('imageLinks' in element.volumeInfo) {
              if ('smallThumbnail' in element.volumeInfo.imageLinks) {
                bookimg = element.volumeInfo.imageLinks.smallThumbnail;
              }
            }
            if (element.volumeInfo.description) {
              synopsis = element.volumeInfo.description;
            }
            books.push({
              id,
              title,
              authors,
              booklink,
              bookimg,
              synopsis
            });

          });

          this.setState({
            books,
            title: '',
            author: '',
            subject: ''
          });
        }
        )
        .catch(err => console.log(err));
    }
  };


  render () {
    return (
      <>
        <h1>Book Search</h1>
        <form>
          <Input
            value={this.state.title}
            onChange={this.handleInputChange}
            onSubmit={this.handleFormSubmit}
            name='title'
            placeholder='Title'
          />
          <Input
            value={this.state.author}
            onChange={this.handleInputChange}
            onSubmit={this.handleFormSubmit}
            name='author'
            placeholder='Author'
          />
          <Input
            value={this.state.subject}
            onChange={this.handleInputChange}
            onSubmit={this.handleFormSubmit}
            name='subject'
            placeholder='Subject'
          />
          <FormBtn onClick={this.handleFormSubmit}>Search</FormBtn>
        </form>
        <h1>Results</h1>
        {this.state.books.length ? (
          <List>
            {this.state.books.map(book => (
              <ListItem key={book._id}>
                <a href={'/books/' + book._id}>
                  <strong>
                    {book.title} by {book.author}
                  </strong>
                </a>
                <BtnView />
                <BtnSave />
              </ListItem>
            ))}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
      </ >
    );
  }
}

export default Search;
