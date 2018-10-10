import React, { Component } from 'react'
import './App.css'
import BookSearch from './BookSearch'
import BookLists from './BookLists'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import { Route } from 'react-router-dom'

class BooksApp extends Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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
    BooksAPI.update(book, shelf).then(()=>{
      this.getAllBooks()
    })
  }

  render() {
    let booksList = this.state.books
    booksList.sort(sortBy('title'))
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BookLists
            books = {this.state.books}
            updateBookShelf = {this.updateBookDetails}
          />
        )}/>
        <Route exact path="/search" render={({history})=>(
          <BookSearch
            updateBookShelf={this.updateBookDetails}
            history={history}
          />
        )}/>
      </div>
    )
  }
}
export default BooksApp;
