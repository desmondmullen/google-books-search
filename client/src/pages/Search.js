import React, { Component } from 'react';
import API from '../utils/API';
import BtnView from '../components/BtnView';
import BtnSave from '../components/BtnSave';
import { List, ListItem } from '../components/List';
import { Input, FormBtn } from '../components/Form';
// import { Input, TextArea, FormBtn } from '../components/Form';

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

  testFunction = event => {
    // const { name, value } = event.target;
    console.log(event.target);
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
          res.data.items.forEach((book, i) => {
            let id = ''
            let title = ''
            let authors = ''
            let description = ''
            let link = ''
            let thumbnail = ''
            if (book.id) {
              id = book.id;
            }
            if (book.volumeInfo.title) {
              title = book.volumeInfo.title;
            }
            if (book.volumeInfo.authors) {
              authors = book.volumeInfo.authors;
              // authors = ' by ' + (book.volumeInfo.authors).join(', ');
            }
            if (book.volumeInfo.description) {
              description = book.volumeInfo.description;
            }
            if (book.volumeInfo.previewLink) {
              link = book.volumeInfo.previewLink;
            }
            if ('imageLinks' in book.volumeInfo) {
              if ('thumbnail' in book.volumeInfo.imageLinks) {
                thumbnail = book.volumeInfo.imageLinks.thumbnail;
              }
            }
            books.push({
              id,
              title,
              authors,
              link,
              thumbnail,
              description
            });
          });

          this.setState({
            books,
            title: '',
            author: '',
            subject: ''
          });
        })
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
              <ListItem key={book.id}>
                <>
                  <strong>{book.title}</strong> <strong>by {book.authors}</strong><br />
                  {/* <a href={'/books/' + book._id}>
                    <strong>{book.title}</strong></a> <strong>by {book.authors}</strong><br /> */}
                  {book.description}<br /></ >
                <a href={book.link} target='_blank'>View</a> <BtnSave />
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
