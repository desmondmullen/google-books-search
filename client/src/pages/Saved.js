import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import DeleteBtn from '../components/DeleteBtn';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, TextArea, FormBtn } from '../components/Form';

//Renders all books saved to the Mongo database. User has an option to 'View' the book, bringing them to the book on Google Books, or 'Delete' a book, removing it from the Mongo database.

class Books extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  render() {
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
                  <DeleteBtn />
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

export default Books;
