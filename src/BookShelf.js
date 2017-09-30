import React from 'react'
import Book from './Book'
import './App.css'

class BookShelf extends React.Component {
  state = {
    shelfTitle: this.props.title,
    books: this.props.books
  }

  render () {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title"> {this.props.shelfTitle} </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.state.books.map( (book) => (
                <li>
                  {book}
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
