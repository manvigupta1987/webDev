import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { Route } from 'react-router-dom'

class App extends Component {
  //this state is maintained inside the component. Whenever the state changes for example: pressing the
  //remove button and delete items, react is able to manage the state.
  state = {
    contacts : []
  }
  componentDidMount() {
    ContactsAPI.getAll().then((contacts)=> {
      this.setState({contacts: contacts})
    })
  }
  removeContact = (contact) => {
    this.setState((state)=> ({
      contacts: state.contacts.filter((c)=> c.id !== contact.id)
    }))
    ContactsAPI.remove(contact)
  }
  createContact = (contact)=>{
    ContactsAPI.create(contact).then(contact=>{
      this.setState(state=>({
        contacts: state.contacts.concat([contact])
      }))
    })

  }

  //use render method with route when you need to pass the props to the component else you can simply
  //use component with render method.
  render(){
    return (
      <div className="app">
      <Route exact path="/" render={()=>(
        <ListContacts
          onDeleteContact={this.removeContact}
          contacts = {this.state.contacts}
        />
      )}/>
      <Route path="/create" render={({history})=>(
        <CreateContact
          onCreateContact={(contact)=>{
            this.createContact(contact)
            history.push('/')
          }}
        />
        )}/>
      </div>
    )
  }
}
export default App;
