import React, { Component } from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class BookLists extends Component{
	static propTypes = {
    	books: PropTypes.array.isRequired,
    	updateBookShelf: PropTypes.func.isRequired
  	}

	render(){
		const {books, updateBookShelf} = this.props
		return(
			<div className="list-books">
            	<div className="list-books-title">
              		<h1>MyReads</h1>
            	</div>
            	<div className="list-books-content">
              		<div>
                		<BookShelf
                			books = {books.filter((book)=>(
                				book.shelf === "currentlyReading"
                			))}
                			title = "Currently Reading"
                			onUpdateShelf = {updateBookShelf}
                		/>
                		<BookShelf
                			books = {books.filter((book)=>(
                				book.shelf === "read"
                			))}
                			title = "Read"
                			onUpdateShelf = {updateBookShelf}
                		/>
                		<BookShelf
                			books = {books.filter((book)=>(
                				book.shelf === "wantToRead"
                			))}
                			title = "Want to Read"
                			onUpdateShelf = {updateBookShelf}
                		/>
              		</div>
              	</div>
            	<div className="open-search">
              		<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            	</div>
          </div>
		)
	}
}
export default BookLists