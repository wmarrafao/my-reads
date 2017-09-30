import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './BookShelf'
import Book from './Book'
import './App.css'

class ListBooks extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( (books) => {
      this.setState({ books })
    })
  }

  render () {
     let currentlyReading = this.state.books.filter( book => book.shelf === "currentlyReading")
     let wantToRead = this.state.books.filter( book => book.shelf === "wantToRead")
     let read = this.state.books.filter( book => book.shelf === "read")

     console.log(currentlyReading)

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {<BookShelf title="Currently Reading" books={currentlyReading}/>}
            {<BookShelf title="Want to Read" books={wantToRead}/>}
            {<BookShelf title="Read" books={read}/>}
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
