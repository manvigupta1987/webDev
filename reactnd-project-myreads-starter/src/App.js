import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch'
import BookLists from './BookLists'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[]
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = ()=>{
    BooksAPI.getAll().then((books)=> {
      console.log(books);
      this.setState({books: books})
    })
  }
  updateBookDetails = (book, shelf)=> {
    console.log(book.id)
    console.log(JSON.stringify({ shelf }))

    BooksAPI.update(book, shelf).then(()=>{
      this.getAllBooks()
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
         <BookSearch/>
        ) : (
          <BookLists
            books = {this.state.books}
            updateBookShelf = {this.updateBookDetails}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
