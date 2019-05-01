import React, { Component } from 'react';
import API from '../utils/API';
import DeleteBtn from '../components/DeleteBtn';
import { List, ListItem } from '../components/List';
import { Input, TextArea, FormBtn } from '../components/Form';

//User can search for books via the Google Books API and render them here. User has the option to 'View' a book, bringing them to the book on Google Books, or 'Save' a book, saving it to the Mongo database.

class Search extends Component {
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
        <h1>Book Search</h1>
        <form>
          <Input name='search' placeholder='search term(s)' />
          <FormBtn>Search</FormBtn>
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
                <DeleteBtn />
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
