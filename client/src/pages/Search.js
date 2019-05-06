import React, { Component } from 'react';
import API from '../utils/API';
import BtnSave from '../components/BtnSave';
import BtnDelete from '../components/BtnDelete';
import SaveNotice from '../components/SaveNotice';
import { List, ListItem } from '../components/List';
import { Input, FormBtn } from '../components/Form';
import '../App.css'

class Search extends Component {
  state = {
    books: [],
    savedBookIds: [],
    title: '',
    author: '',
    subject: ''
  };

  componentDidMount () {
    this.getSavedBookIds();
  }

  getSavedBookIds = () => {
    API.getBooks()
      .then(res => {
        let savedBookIds = [];
        res.data.forEach((book, i) => {
          savedBookIds.push(book.id)
        })
        console.log(savedBookIds);
        this.setState({ savedBookIds: savedBookIds })
      })
      .catch(err => console.log(err));
  }

  saveBook = (event) => {
    const theId = event.target.getAttribute('data-id')
    API.saveBook(theId)
    this.updateSaved(theId, true)
  }

  getBook = event => {
    API.getBook(event.target.getAttribute('data-id'))
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  }

  deleteBook = (event) => {
    const theId = event.target.getAttribute('data-id')
    API.deleteBook(theId)
      .then(res => {
        this.updateSaved(theId, false)
      })
      .catch(err => console.log(err));
  }

  updateSaved = (theId, saved) => {
    let books = this.state.books;
    for (let i = 0; i < books.length; i++) {
      console.log(i);
      if (books[i].id === theId) {
        books[i] = { ...books[i], saved: saved };
        this.setState({ books })
        console.log(this.state.books[i]);
        break;
      }
    }
  }

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
          res.data.items.forEach((book, i) => {
            let id = ''
            let title = ''
            let authors = ''
            let description = ''
            let previewLink = ''
            let thumbnail = ''
            let saved = false
            if (book.id) {
              id = book.id;
            }
            if (book.volumeInfo.title) {
              title = book.volumeInfo.title;
            }
            if (book.volumeInfo.authors) {
              authors = book.volumeInfo.authors;
              if (authors.length > 1) {
                authors = book.volumeInfo.authors.join(', ');
              }
            }
            if (book.volumeInfo.description) {
              description = book.volumeInfo.description;
            }
            if (book.volumeInfo.previewLink) {
              previewLink = book.volumeInfo.previewLink;
            }
            if ('imageLinks' in book.volumeInfo) {
              if ('thumbnail' in book.volumeInfo.imageLinks) {
                thumbnail = book.volumeInfo.imageLinks.thumbnail;
              }
            }
            if (this.state.savedBookIds.includes(book.id)) { saved = true }
            books.push({
              id,
              title,
              authors,
              description,
              previewLink,
              thumbnail,
              saved
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
        <form>
          <div className='search-bar'><div className='search-fields'>
            Title: <Input
              value={this.state.title}
              onChange={this.handleInputChange}
              onSubmit={this.handleFormSubmit}
              name='title'
              placeholder='Title'
            /> Author: <Input
              value={this.state.author}
              onChange={this.handleInputChange}
              onSubmit={this.handleFormSubmit}
              name='author'
              placeholder='Author'
            /> Subject: <Input
              value={this.state.subject}
              onChange={this.handleInputChange}
              onSubmit={this.handleFormSubmit}
              name='subject'
              placeholder='Subject'
            /></div><FormBtn onClick={this.handleFormSubmit}>Search</FormBtn></div>
        </form>
        <SaveNotice />
        {this.state.books.length ? (
          <List>
            {this.state.books.map(book => (
              <ListItem key={book.id}>
                <>
                  <div className='book-topbar'><section className='book-buttons'>{book.saved ? <BtnDelete data-id={book.id} onClick={this.deleteBook} /> : <BtnSave data-id={book.id} onClick={this.saveBook} />} <a href={book.previewLink} className='btn' target='_blank' rel='noopener noreferrer'>View</a></section>
                    <section className='book-title'>{book.title}</section><section className='book-author'>by {book.authors}</section></div><div><img className='book-thumbnail' src={book.thumbnail} alt='' /><section className='book-description'>{book.description}</section></div></ >
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