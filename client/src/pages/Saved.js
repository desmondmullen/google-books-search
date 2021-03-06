import React, { Component } from 'react';
import API from '../utils/API';
import BtnDelete from '../components/BtnDelete';
import SaveNotice from '../components/SaveNotice';
import { List, ListItem } from '../components/List';

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
        <br />
        <SaveNotice />
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
            <>
              <h3 className='no-results'>No Results to Display</h3>
            </ >
          )}
      </ >
    );
  }
}

export default Saved;
