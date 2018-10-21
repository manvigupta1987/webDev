import React, { Component } from 'react'

class Map extends Component {

	state = {
		map: '',
		infoWindow : {},
		locations: [{
          'title': "Carmen's Cuban Cafe & Lounge",
          'type': "restaurant",
          'position': {
            'lat': 35.86226399999999,
            'lng': -78.81819100000001
          },
          'placeId': 'ChIJ58wYqsnxrIkR35nmdWvlVzY'
        },
        {
          'title': "Babymoon Cafe",
          'type': "restaurant",
          'position': {
            'lat': 35.8512457,
            'lng': -78.8270928
          },
          'placeId': 'ChIJM47UNN3xrIkRQoSk4tao5x4'
        },
        {
          'title': "Bad Daddy's Burger Bar",
          'type': "restaurant",
          'position': {
            'lat': 35.80801,
            'lng': -78.81897750000002
          },
          'placeId': 'ChIJ6YeE-j_yrIkRlV7JL6CbplM'
        },
        {
          'title': "Mi Cancun",
          'type': "restaurant",
          'position': {
            'lat': 35.8200653,
            'lng': -78.84567930000003
          },
          'placeId': 'ChIJlbm9afrtrIkRBf8o160LD-s'
        },
        {
          'title': "La Farm",
          'type': "bakery",
          'position': {
            'lat': 35.7906696,
            'lng': -78.8274806
          },
          'placeId': 'ChIJXVEwV3vyrIkRgJmnZlguzq0'
        },
        {
          'title': "Smokey's BBQ Shack",
          'type': "restaurant",
          'position': {
            'lat': 35.8497941,
            'lng': -78.8391595
          },
          'placeId': 'ChIJl22V7x_urIkRAVHDxziyALE'
        },
        {
          'title': "Lugano Ristorante",
          'type': "restaurant",
          'position': {
            'lat': 35.79994500000001,
            'lng': -78.81612410000002
          },
          'placeId': 'ChIJn_9e-GnyrIkRkVpEDRJO320'
        },
        {
          'title': "Texas Steakhouse & Saloon",
          'type': "restaurant",
          'position': {
            'lat': 35.8576266,
            'lng': -78.82137210000002
          },
          'placeId': 'ChIJBegz1sXxrIkRtnXyJrfKTrY'
        },
        {
          'title': "Doherty's Irish Pub & Restaurant",
          'type': "restaurant",
          'position': {
            'lat': 35.7885254,
            'lng': -78.84812620000002
          },
          'placeId': 'ChIJp-wS2ZztrIkRP1Xa2q30Ppo'
        }],
        oldMarker: ''
	}
	componentDidMount () {
		this.initMap()
	}

	setMarkers = (map) =>{
		const mapLocations = []
		this.state.locations.map((location) =>{
			const marker = new window.google.maps.Marker({
				position: new window.google.maps.LatLng(location.position),
				animation: window.google.maps.Animation.DROP,
				map,
				title:location.title
			})
			location.marker = marker
			location.visible = true
			mapLocations.push(location)
			marker.addListener('click', () => {
				this.openInfoWindow(marker)
			})
		})

		this.setState({locations: mapLocations})
	}

	toggleBounce = (marker)=> {
		if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
    }

	openInfoWindow = (marker)=>{
		this.closeInfoWindow()
		this.state.infoWindow.open(this.state.map, marker)
		this.state.infoWindow.setContent(marker.title)
		this.toggleBounce(marker)
		this.setState({oldMarker: marker})
		this.state.map.panTo(marker.getPosition())
	}

	closeInfoWindow = () => {
		if(this.state.oldMarker){
			this.toggleBounce(this.state.oldMarker)
		}
		this.setState({oldMarker: ''})
   		this.state.infoWindow.close()
  	}

	initMap() {
		if (this.props && this.props.google) {
      		// google is available
      		const map = new window.google.maps.Map(document.querySelector('#map'), {
        		center: {
          			lat: 35.823483,
          			lng: -78.82556210000001
        		},
        		mapTypeControl: false,
        		zoom: 13
      		})
      		const infoWindow = new window.google.maps.InfoWindow({})
      		this.setState({map, infoWindow})
      		this.setMarkers(map)

      		window.google.maps.event.addListener(map, 'click', () => {
        		this.closeInfoWindow()
      		})
      	}
	}

	render() {
		const style = {
      		width: '100%',
      		height: '100%'
    	}
		return(
			<div id='map' style={style}>
			</div>
		)
	}
}

export default Map
