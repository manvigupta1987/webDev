import React, { Component } from 'react'

function PlaceItem (props) {
	return(
		<li className="place-item" role="button" tabIndex='0'
			onClick={()=>{
				props.openInfoWindow(props.location.marker)
				props.getMarkerInfo(props.location)
			}}
			onKeyPress={()=>{
				props.openInfoWindow(props.location.marker)
				props.getMarkerInfo(props.location)
			}}>
			{props.location.longName}
		</li>
	)
}

export default PlaceItem