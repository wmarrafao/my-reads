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
              <li>
                <Book
                  title={book.title}
                  author={book.authors[0]}
                  coverImgURL={book.imageLinks.smallThumbnail}
                  shelf={book.shelf}
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
