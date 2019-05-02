import React, { Component } from 'react';
import API from '../utils/API';
import BtnView from '../components/BtnView';
import BtnDelete from '../components/BtnDelete';
import { List, ListItem } from '../components/List';
import { Input, TextArea, FormBtn } from '../components/Form';

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

  render () {
    return (
      <>
        <h1>Saved</h1>
        {
          this.state.books.length ? (
            <List>
              {this.state.books.map(book => (
                <ListItem key={book._id}>
                  <a href={'/books/' + book._id}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </a>
                  <BtnView />
                  <BtnDelete />
                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )
        }
      </ >
    );
  }
}

export default Saved;
