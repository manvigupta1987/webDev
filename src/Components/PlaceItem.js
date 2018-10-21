import React from 'react'
import selectedMarker from '../images/dinner_selected.png'
import markerImg from '../images/dinner.png'

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
			}}
			onMouseOver={()=>{
				props.setMarkerIcon(props.location.marker, selectedMarker)
			}}
			onFocus={() => {
				props.setMarkerIcon(props.location.marker, selectedMarker)
			}}
			onMouseOut={()=>{
				props.setMarkerIcon(props.location.marker, markerImg)
			}}
			>
			{props.location.longName}
		</li>
	)
}

export default PlaceItem