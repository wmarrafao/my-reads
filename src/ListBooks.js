import React from 'react'
//import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Book from './Book'
import books from './utils/books'
import './App.css'

class ListBooks extends React.Component {
  state = {
    books: books
  }

  render () {
    let currentlyReading = this.state.books.filter( book => book.props.shelf === "Currently Reading")
    let wantToRead = this.state.books.filter( book => book.props.shelf === "Want to Read")
    let read = this.state.books.filter( book => book.props.shelf === "Read")

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {<BookShelf shelfTitle="Currently Reading" books={currentlyReading}/>}
            {<BookShelf shelfTitle="Want to Read" books={wantToRead}/>}
            {<BookShelf shelfTitle="Read" books={read}/>}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => console.log("Search Clicked!")}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks
