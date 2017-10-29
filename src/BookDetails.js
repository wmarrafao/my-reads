import React from 'react'
import './App.css'

class BookDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: undefined,
      notes: "This space is dedicated for interesting ideas and passages you encountered in this book. Remeber to add the page number so that you can always go back and read it again :)",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      rating: this.props.book.rating,
      notes: this.props.book.notes,
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    this.props.toggleBookDetails();
    event.preventDefault();
  }

  render() {
    return (
      <div id="popup1" className="overlay">
        <div className="popup">
          <h2>{this.props.book.title}</h2>
          <a className="close" onClick={this.props.toggleBookDetails}>&times;</a>
          <div className="content">
            <form onSubmit={this.handleSubmit}>
              <fieldset className="rating">
                <legend>Rating:</legend>
                <input type="radio" name="rating" value="1" onChange={this.handleChange} checked={1 == this.state.rating} /><label htmlFor="star1" title="Sucks big time">1</label>
                <input type="radio" name="rating" value="2" onChange={this.handleChange} checked={2 == this.state.rating} /><label htmlFor="star2" title="Kinda bad">2</label>
                <input type="radio" name="rating" value="3" onChange={this.handleChange} checked={3 == this.state.rating} /><label htmlFor="star3" title="Meh">3</label>
                <input type="radio" name="rating" value="4" onChange={this.handleChange} checked={4 == this.state.rating} /><label htmlFor="star4" title="Pretty good">4</label>
                <input type="radio" name="rating" value="5" onChange={this.handleChange} checked={5 == this.state.rating} /><label htmlFor="star5" title="Rocks!">5</label>
              </fieldset>
              <p>
                <label> Remarkable Ideas: </label>
                <textarea name="notes" value={this.state.notes} onChange={this.handleChange} rows="5"> </textarea>
              </p>
              <button className="done-btn" onClick={() => this.props.updateBookDetails(this.props.book.id, this.state.rating, this.state.notes)}>Done</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

}


export default BookDetails
