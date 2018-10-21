import React, { Component } from 'react'
import PlaceItem from './PlaceItem'

class PlacesList extends Component {
	state = {
		query: '',
		locations: []
	}

	componentDidMount(){
		this.setState({locations: this.props.locations})
	}

	filterPlaces = (query)=>{
		this.props.closeInfoWindow()
		const locations = this.props.locations.map((location)=>{
			if(location.longName.toLowerCase().indexOf(query.toLowerCase()) !== -1){
				location.marker.setVisible(true)
			}else{
				location.marker.setVisible(false)
			}
			return location
		})
		this.setState({query, locations})
	}
	render(){
		const placeList = this.state.locations.map((location) =>(
			<PlaceItem
				key={location.placeId}
				openInfoWindow = {this.props.openInfoWindow}
				location ={location}
				getMarkerInfo= {this.props.getMarkerInfo}
			/>
		))
		return(
			<div className="search">
				<input type='text' role='search' aria-labelledby='filter' id='search-field'
				value={this.state.query}
				onChange={(event) => (this.filterPlaces(event.target.value))}/>
				<ul>
					{placeList}
				</ul>
			</div>
		)
	}
}

export default PlacesList