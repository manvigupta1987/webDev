import React, { Component } from 'react'

class PlaceItem extends Component {
	render() {
		return(
			<li className="place-item" role="button" tabIndex='0'
				onClick={()=>{
					this.props.openInfoWindow(this.props.location.marker)
					this.props.getMarkerInfo(this.props.location)
				}}>
				{this.props.location.longName}
			</li>
		)
	}
}

export default PlaceItem