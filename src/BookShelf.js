import React from 'react'
import Book from './Book'
import './App.css'

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title"> {props.title} </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            props.books.map( (book) => (
              <li key={book.id}>
                <Book
                  id={book.id}
                  title={book.title? book.title : 'Not Avaliable'}
                  authors={book.authors? book.authors.toString() : 'Not Avaliable'}
                  coverImgURL={book.imageLinks? book.imageLinks.smallThumbnail : '' }
                  shelf={book.shelf}
                  updateBookShelf={props.updateBookShelf}
                />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}

export default BookShelf
