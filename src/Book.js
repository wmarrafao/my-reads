import React from 'react'
import './App.css'

class Book extends React.Component {
  state = {
    title: this.props.title,
    author: this.props.author,
    coverImgURL: this.props.coverImgURL,
    shelf: this.props.shelf,
  }

  render () {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.state.coverImgURL})` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title"> {this.state.title} </div>
        <div className="book-authors"> {this.state.author} </div>
      </div>
    )
  }
}

export default Book
