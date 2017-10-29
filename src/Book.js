import React from 'react'
import './App.css'

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shelf: "",
      notes: "",
      rating: -1,
    };
  }

  componentDidMount() {
    this.setState( {shelf: this.props.shelf, rating: this.props.rating, notes: this.props.notes} );
  }

  updateShelf(shelf) {
    this.setState({ shelf });
    this.props.updateBookShelf(this.props, shelf);
  }

  updateRating(rating) {
    this.setState({ rating });
  }

  updateNotes(notes) {
      this.setState({ notes });
  }

  render () {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" onClick={() => this.props.displayBookDetails(this.props)} style={ { width: 128, height: 193, backgroundImage: `url(${this.props.coverImgURL})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={(event) => this.updateShelf(event.target.value)}>
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
