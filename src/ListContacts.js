import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired
	}
	state = {
		query: ''
	}
	updateQuery = (query)=>{
		this.setState({ query:query.trim() })
	}
	render() {
		//Object deconstructing
		const {contacts, onDeleteContact} = this.props
		const {query} = this.state

		let showingContacts
		if(query){
			//when you pass a certain characters like /, ^, $ etc. escapeRegExp checks if there is any
			//special character inside the query parameter, go ahead and escape them so that we can use them
			// string literal rather than special regexp characters.
			// i --> represents that we dont care about case.
			const match = new RegExp(escapeRegExp(query), 'i')
			showingContacts = contacts.filter((contact)=> match.test(contact.name))
		} else {
			showingContacts = contacts
		}
		//sortBy is the utility helper which allows us to sort by a specific property in that array of objects.
		showingContacts.sort(sortBy('name'))

		return (
		<div className = 'list-contacts'>
			<div className='list-contacts-top'>
				<input
					className='search-contacts'
					type='text'
					placeholder='Search contacts'
					value={query}
					onChange={(event)=>{this.updateQuery(event.target.value)}}
				/>
			</div>
			<ol className = 'contact-list'>
			{showingContacts.map((contact)=> (
				<li key={contact.id} className='contact-list-item'>
					<div className='contact-avatar' style={{
						backgroundImage: `url(${contact.avatarURL})`
					}}/>
					<div className='contact-details'>
						<p>{contact.name}</p>
						<p>{contact.email}</p>
					</div>
					<button onClick={()=>onDeleteContact(contact)} className='contact-remove'>
						Remove
					</button>
				</li>
			))}
			</ol>
		</div>
		)
	}
}

export default ListContacts;