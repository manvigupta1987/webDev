import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'

class App extends Component {
  //this state is maintained inside the component. Whenever the state changes for example: pressing the
  //remove button and delete items, react is able to manage the state.
  state = {
    screen: 'list',
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
      <div className="app">
      {this.state.screen === 'list' && (
        <ListContacts
          onDeleteContact={this.removeContact}
          contacts = {this.state.contacts}
          onNavigate = {()=>{this.setState({screen: 'create'})}}
        />
      )}
      {this.state.screen === 'create' && (
        <CreateContact/>
      )}
      </div>
    )
  }
}
export default App;
