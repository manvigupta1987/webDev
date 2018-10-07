import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'

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

  render(){
    return (
      <div>
        <ListContacts
          onDeleteContact={this.removeContact}
          contacts = {this.state.contacts}
        />
      </div>
    )
  }
}
export default App;
