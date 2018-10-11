import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookSearch extends Component{
	state = {
		query: '',
		books:[]
	}
	updateQuery = (query)=>{
		if(query.length >0){
			this.setState({ query:query})
			BooksAPI.search(query).then((response)=>{
				if(response.error && response.error === "empty query") {
					this.setState({query:query, books:[]})
					return
				}
				if(response.length > 0){
					response.map((book)=>{
							const commBook = this.props.booksOnMyReads.find((booksOnMyRead)=>
							booksOnMyRead.id === book.id);
							book.shelf = commBook ? commBook.shelf : "none"
							return book
					})
					this.setState({books:response})
				}
			})
		} else {
			this.setState({query:'', books:[]})
		}
	}
	updateShelf = (book,shelf)=> {
		console.log(book)
		this.props.updateBookShelf(book, shelf)
	}

	render(){

		return (
			<div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                	type="text"
                	placeholder="Search by title or author"
                	value={this.state.query}
					onChange={(event)=>{this.updateQuery(event.target.value)}}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
				{this.state.query.length >0 && this.state.books.map((book, index)=>(
					<Book
						book={book}
						key={index}
						onChangeBookShelf={(shelf)=>{
							this.updateShelf(book, shelf)
						}}/>
				))}
              </ol>
            </div>
          </div>
		)
	}
}
export default BookSearch