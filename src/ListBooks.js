import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './BookShelf'
import Book from './Book'
import './App.css'

class ListBooks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentlyReading: this.props.books.filter( book => book.shelf === "currentlyReading"),
      wantToRead: this.props.books.filter( book => book.shelf === "wantToRead"),
      read: this.props.books.filter( book => book.shelf === "read")
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(`receiveing nextProps.`)
    if (this.props != nextProps) {
      this.setState({
        currentlyReading: nextProps.books.filter( book => book.shelf === "currentlyReading"),
        wantToRead: nextProps.books.filter( book => book.shelf === "wantToRead"),
        read: nextProps.books.filter( book => book.shelf === "read"),
      })
    }
  }

  render () {

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {<BookShelf title="Currently Reading" books={this.state.currentlyReading} updateBookShelf={this.props.updateBookShelf}/>}
            {<BookShelf title="Want to Read" books={this.state.wantToRead} updateBookShelf={this.props.updateBookShelf}/>}
            {<BookShelf title="Read" books={this.state.read} updateBookShelf={this.props.updateBookShelf}/>}
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            > Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
