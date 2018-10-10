import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component{
	render(){
		return (
			<div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{this.props.books.map((book, index)=>(
							<Book book={book} key={index}/>
						))}
                    </ol>
                </div>
            </div>
		)
	}
}
export default BookShelf