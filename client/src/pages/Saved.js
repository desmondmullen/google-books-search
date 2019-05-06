import React, { Component } from 'react';
import API from '../utils/API';
import BtnDelete from '../components/BtnDelete';
import { List, ListItem } from '../components/List';
// import { Input, TextArea, FormBtn } from '../components/Form';

//Renders all books saved to the Mongo database. User has an option to 'View' the book, bringing them to the book on Google Books, or 'Delete' a book, removing it from the Mongo database.

class Saved extends Component {
  state = {
    books: []
  };

  componentDidMount () {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  deleteBook = (event) => {
    API.deleteBook(event.target.getAttribute('data-id'))
      .then(res => {
        this.loadBooks()
      })
      .catch(err => console.log(err));
  }

  render () {
    return (
      <>
        {/* <h1>Saved</h1> */}
        {this.state.books.length ? (
          <List>
            {this.state.books.map(book => (
              <ListItem key={book.id}>
                <>
                  <div className='book-topbar'><section className='book-buttons'><BtnDelete data-id={book.id} onClick={this.deleteBook} /> <a href={book.previewLink} className='btn' target='_blank' rel='noopener noreferrer'>View</a></section><section className='book-title'>{book.title}</section><section className='book-author'>by {book.authors}</section></div><div><img className='book-thumbnail' src={book.thumbnail} alt='' /><section className='book-description'>{book.description}</section></div></ >
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

export default Saved;
