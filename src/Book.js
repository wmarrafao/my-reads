import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class Book extends React.Component {
  state = {
    shelf: ""
  }

  componentDidMount() {
    this.setState( {shelf: this.props.shelf} )
  }


  render () {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.coverImgURL})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={(event) => this.props.updateBookShelf(this.props, event.target.value)}>
              <option value="none">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title"> {this.props.title} </div>
        <div className="book-authors"> {this.props.authors} </div>
      </div>
    )
  }
}

export default Book
