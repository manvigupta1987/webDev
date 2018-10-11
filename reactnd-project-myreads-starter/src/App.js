import React, { Component } from 'react'
import sortBy from 'sort-by'
import { Route } from 'react-router-dom'

import BookSearch from './BookSearch'
import BookLists from './BookLists'
import * as BooksAPI from './BooksAPI'
import './App.css'


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

  /**
   * find all books added to the library
   * @param none
   */
  getAllBooks = ()=>{
    BooksAPI.getAll().then((books)=> {
      console.log(books);
      this.setState({books: books})
    })
  }

  /**
   * Change the shelf of a book or Adds it to the Library in a shelf
   * @param {string} book object
   * @param {string} shelf
   */
  updateBookDetails = (book, shelf)=> {

    const bookIndex = this.state.books.findIndex((stateBook)=> stateBook.id === book.id);
    BooksAPI.update(book, shelf).then(()=>{
      if(bookIndex > -1) {
        const newBooks = this.state.books.map((stateBook)=>{
          if(stateBook.id===book.id){
            stateBook.shelf = shelf
          }
          return stateBook
        })
        this.setState({books:newBooks})
      }else{
        book.shelf = shelf
        const newBook = this.state.books.concat([book])
        this.setState({books: newBook})
      }
    })
  }

  render() {
    let bookList = this.state.books
    bookList.sort(sortBy('title'))
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BookLists
            books = {bookList}
            updateBookShelf = {this.updateBookDetails}
          />
        )}/>
        <Route exact path="/search" render={({history})=>(
          <BookSearch
            updateBookShelf={this.updateBookDetails}
            booksOnMyReads={bookList}
          />
        )}/>
      </div>
    )
  }
}
export default BooksApp;
