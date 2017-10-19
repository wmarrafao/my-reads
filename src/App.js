import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super();

    this.state = {
      books: []
    }
    this.updateShelf = this.updateShelf.bind(this)
  }

  componentDidMount() {
    BooksAPI.getAll().then( (books) => {
      this.setState({ books })
    })
  }

  removeBook(book) {
    this.state.books.forEach( (b) => {
      if (b.id == book.id) {
        this.setState((state) => ({
          books: state.books.filter((b) => b.id !== book.id)
        }))
        return
      }
    })
  }

  updateShelf(book, shelf) {
    if (shelf == 'none') {
      this.removeBook(book)
    } else {
      this.setState( (state) => {
        let index = this.state.books.findIndex( (b) => b.id === book.id)
        let updatedBooks = this.state.books
        if (index === -1) {
          BooksAPI.get(book.id).then((newBook) => {
            updatedBooks.push(newBook)
            {books: updatedBooks}
          })
        } else {
          updatedBooks[index].shelf = shelf
          {books: updatedBooks}
        }
      })
    }

    BooksAPI.update(book, shelf).then((res) => {
      console.log(res)
    })
  }

  render() {
    console.log("render.")
    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <ListBooks
              books={this.state.books} updateBookShelf={this.updateShelf}
            />
          )}/>
        <Route path='/search' render={() => (
          <SearchBooks updateBookShelf={this.updateShelf}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
