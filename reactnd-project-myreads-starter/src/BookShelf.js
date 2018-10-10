import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component{

	updateShelf = (book,shelf)=>{
		this.props.onUpdateShelf(book, shelf)
	}
	render(){
		return (
			<div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{this.props.books.map((book, index)=>(
							<Book
								book={book}
								key={index}
								onChangeBookShelf={(shelf)=>{
									this.updateShelf(book, shelf)
								}}
							/>
						))}
                    </ol>
                </div>
            </div>
		)
	}
}
export default BookShelf