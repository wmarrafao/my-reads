import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import BookDetails from './BookDetails'
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      bookDetails: {},
      displayDetails: false
    };
    this.updateShelf = this.updateShelf.bind(this);
    this.displayBookDetails = this.displayBookDetails.bind(this);
    this.updateBookDetails = this.updateBookDetails.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then( (books) => {
      this.setState({ books });
    })
  }

  removeBook(book) {
    this.state.books.forEach( (b) => {
      if (b.id === book.id) {
        this.setState((state) => ({
          books: state.books.filter((b) => b.id !== book.id)
        }));
        return;
      }
    })
  }

  updateShelf(book, shelf) {
    if (shelf === 'none') {
      this.removeBook(book);
    } else {
      this.setState( (state) => {
        let index = this.state.books.findIndex( (b) => b.id === book.id);
        let updatedBooks = this.state.books;
        if (index === -1) {
          BooksAPI.get(book.id).then((newBook) => {
            updatedBooks.push(newBook);
            return { books: updatedBooks };
          })
        } else {
          updatedBooks[index].shelf = shelf;
          return { books: updatedBooks };
        }
      })
    }

    BooksAPI.update(book, shelf).then((res) => {
      console.log(res);
    })
  }

  displayBookDetails(book) {
    if (this.state.displayDetails) {
      this.setState( (state) => (
        {displayDetails: !state.displayDetails, bookDetails: {}}
      ))
    } else {
      let index = this.state.books.findIndex( (b) => b.id === book.id);
      this.setState( (state) => (
        {displayDetails: !state.displayDetails, bookDetails: state.books[index]}
      ))
    }
  }

  updateBookDetails(id, rating, notes) {
    let index = this.state.books.findIndex( (b) => b.id === id);
    var updatedBooks = this.state.books;
    updatedBooks[index].rating = rating;
    updatedBooks[index].notes = notes;
    
    this.setState( (state) => (
      {books: updatedBooks}
    ))
  }

  render() {
    console.log("render");
    var bookDetails = undefined;
    if (this.state.displayDetails) {
      bookDetails = <BookDetails book={this.state.bookDetails} toggleBookDetails={this.displayBookDetails} updateBookDetails={this.updateBookDetails}/>
    }
    return (
      <div className="app">
        {bookDetails}
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            updateBookShelf={this.updateShelf}
            displayBookDetails={this.displayBookDetails}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            updateBookShelf={this.updateShelf}
            displayBookDetails={this.displayBookDetails}
          />
        )}/>
      </div>
    )
  }
}


export default BooksApp
