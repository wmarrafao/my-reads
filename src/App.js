import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super();

    this.state = {
      /**
      * TODO: Instead of using this state variable to keep track of which page
      * we're on, use the URL in the browser's address bar. This will ensure that
      * users can use the browser's back and forward buttons to navigate between
      * pages, as well as provide a good URL they can bookmark and share.
      */
      showSearchPage: false,
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
      let index = this.state.books.findIndex( (b) => b.id === book.id)

      this.setState( (state) => {
        let index = state.books.findIndex( (b) => b.id === book.id)
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
        {this.state.showSearchPage ? <SearchBooks updateBookShelf={this.updateShelf}/> : <ListBooks books={this.state.books} updateBookShelf={this.updateShelf}/>}
        <div className="open-search">
          <a onClick={() => {this.setState({showSearchPage: !this.state.showSearchPage})}}> Add a book</a>
        </div>
      </div>
    )
  }
}

export default BooksApp
