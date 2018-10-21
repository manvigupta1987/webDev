import React, { Component } from 'react'
import PlaceItem from './PlaceItem'

class PlacesList extends Component {
	state = {
		query: '',
		locations: [],
		suggestions: true
	}

	componentWillMount(){
		this.setState({locations: this.props.locations})
	}

	toggleSuggestionsList = ()=> {
		this.setState({suggestions: !this.state.suggestions})
	}

	filterPlaces = (query)=>{
		this.props.closeInfoWindow()
		const locations = this.props.locations.map((location)=>{
			if(location.longName.toLowerCase().indexOf(query.toLowerCase()) !== -1){
				location.marker.setVisible(true)
				location.visible = true
			}else{
				location.marker.setVisible(false)
				location.visible = false
			}
			return location
		})
		this.setState({query, locations})
	}
	render(){
		const {query, locations, suggestions} = this.state;
		const placeList = locations.filter((location) => location.visible).map((location) => (
			<PlaceItem
				key={location.placeId}
				openInfoWindow = {this.props.openInfoWindow}
				location ={location}
				getMarkerInfo= {this.props.getMarkerInfo}
				setMarkerIcon={this.props.setMarkerIcon}
			/>
		))
		return(
			<div className="place-list">
				<input type='text' role='search' aria-labelledby='filter' id='input-field' placeholder="Filter Places"
				value={query}
				onChange={(event) => (this.filterPlaces(event.target.value))}/>
				<ul>
					{suggestions && placeList}
				</ul>
				<button
					className="suggestionButton"
					onClick={()=>(
						this.toggleSuggestionsList()
					)}>Show/Hide Suggestions
				</button>
			</div>
		)
	}
}

export default PlacesList