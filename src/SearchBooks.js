import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'
import './App.css'

class SearchBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      books: [],
      displayBooks: false
    };
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    });

    if (query.length === 0) {
      this.setState({ books: [], displayBooks: false });
      return;
    }

    //console.log(`query = ${query}`);
    BooksAPI.search(query, 20).then( (books) => {
      if (books.error) {
        this.setState({ books: [], displayBooks: false });
        return;
      }
      let updatedBooks = books.map( (book) => {
        let index = this.props.books.findIndex( (b) => b.id === book.id);
        if (index !== -1) {
          book.shelf = this.props.books[index].shelf;
        }
        return book;
      })
      // making sure to display results if the query is still the same when this callback was triggered
      if (this.state.query === query) {
        this.setState({ books: updatedBooks, displayBooks: true });
      }
    });

  }

  render () {
    this.state.books.sort(sortBy('title'));
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.books.map( (book) => (
                <li key={book.id}>
                  <Book
                    id={book.id}
                    title={book.title? book.title : 'Not Avaliable'}
                    authors={book.authors? book.authors.toString() : 'Not Avaliable'}
                    coverImgURL={book.imageLinks? book.imageLinks.smallThumbnail : '' }
                    shelf={book.shelf}
                    updateBookShelf={this.props.updateBookShelf}
                    displayBookDetails={() => {}}
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}


export default SearchBooks
