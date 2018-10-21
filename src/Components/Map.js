import React, { Component } from 'react'
import PlacesList from './PlacesList'
import foursquareImg from '../images/foursquare.png'

class Map extends Component {

	state = {
		map: '',
		infoWindow : {},
		locations: [{
          'title': "Alpaca Peruvian Chicken",
          'type': "restaurant",
          'position': {
            'lat':  35.80485055389427,
            'lng': -78.81220078185558
          },
          'placeId': '536c2e5311d2c27884d6867a'
        },
        {
          'title': "Babymoon Cafe",
          'type': "restaurant",
          'position': {
            'lat': 35.8512457,
            'lng': -78.8270928
          },
          'placeId': '4b046caff964a520105422e3'
        },
        {
          'title': "Triangle Rock Club",
          'type': "restaurant",
          'position': {
            'lat': 35.81091330934045,
            'lng': -78.82075839631239
          },
          'placeId': '4b523d80f964a520fc7127e3'
        },
        {
          'title': "Mi Cancun",
          'type': "restaurant",
          'position': {
            'lat': 35.8200653,
            'lng': -78.84567930000003
          },
          'placeId': '54ad727b498ee8be99cb04ae'
        },
        {
          'title': "Neomonde",
          'type': "bakery",
          'position': {
            'lat': 35.8295532,
            'lng': -78.8278588
          },
          'placeId': '4ada9578f964a520a82321e3'
        },
        {
          'title': "Smokey's BBQ Shack",
          'type': "restaurant",
          'position': {
            'lat': 35.8497941,
            'lng': -78.8391595
          },
          'placeId': '4b50b919f964a520632f27e3'
        },
        {
          'title': "Chipotle Mexican Grill",
          'type': "restaurant",
          'position': {
            'lat': 35.806871394448315,
            'lng': -78.8150586684328
          },
          'placeId': '506775c3e4b0d7d96ba379fd'
        },
        {
          'title': "Rise Biscuits and Donuts",
          'type': "restaurant",
          'position': {
            'lat': 35.8079038801952,
            'lng': -78.81532165891711
          },
          'placeId': '55d86199498e86c4d50f529e'
        },
        {
          'title': "Firebirds Wood Fired Grill",
          'type': "restaurant",
          'position': {
            'lat': 35.807738956731896,
            'lng': -78.81880058823674
          },
          'placeId': '51f824e88bbdcb46a582985c'
        }],
        oldMarker: ''
	}
	componentDidMount () {
		this.initMap()
	}

	getMarkerDetails = (location)=> {
		const client_secret = 'YJQZ5FTKIA5UHUDU2BNACLRW14WZBDQLOO0KIWNSBUC2QN4V'
		const client_id = 'CFSMRM4YK0LMFIZIOO1ETN50A1TXPJENSO3EUOIEBXK3E5ER'
		const foursquareUrl = `https://api.foursquare.com/v2/venues/${location.placeId}?client_id=${client_id}&client_secret=${client_secret}&v=20181018`

		fetch(foursquareUrl)
			.then((response) =>{
				if(response.status !== 200){
					this.state.infoWindow.setContent("No result found")
					return
				}

				response.json().then((data) => {
        			const { venue } = data.response
        			console.log(venue)
        			this.state.infoWindow.setContent(`<div class='marker-info'>
        				<h2 class="marker-name">${venue.name}</h2>
        				<img class="marker-photo" src=${venue.bestPhoto ? `${venue.bestPhoto.prefix}300x200${venue.bestPhoto.suffix}` : "no phone found" } alt="restaurant photo">
        				<h3 class="markerInfo">${venue.location.address? venue.location.address : venue.location.formattedAddress[0]}</h3>
        				<p class="markerInfo"><strong>Contact Number: </em></strong>${venue.contact.formattedPhone? venue.contact.formattedPhone : "phone number not available"}</p>
        				<p class="markerInfo"><strong><em>hours: </em></strong>${venue.hours.status}</p>
        				<p class="markerInfo">${venue.rating ? '<strong><em>Rating: </em></strong>'+ venue.rating: ''}</p>
        				<p class="markerInfo"><a href='${venue.canonicalUrl}' target='_blank'>Read more</a></p>
        				<img src=${foursquareImg} alt="Powered By foursquare"/>
        				</div>`)
      			})
			})
			.catch((err) => {
				this.state.infoWindow.setContent("No result found")
			})

	}

	setMarkers = (map) =>{
		const mapLocations = this.state.locations.map((location) =>{
			const marker = new window.google.maps.Marker({
				position: new window.google.maps.LatLng(location.position),
				animation: window.google.maps.Animation.DROP,
				map,
				title:location.title
			})
			location.longName = `${location.title} - ${location.type}`
			location.marker = marker
			location.visible = true
			marker.addListener('click', () => {
				this.openInfoWindow(marker)
				this.getMarkerDetails(location)
			})
			return location
		})
		this.setState({locations: mapLocations})
	}

	toggleBounce = (marker)=> {
		if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => {marker.setAnimation(null);}, 300)
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
			<div>
				<PlacesList
					locations={this.state.locations}
					openInfoWindow = {this.openInfoWindow}
					closeInfoWindow = {this.closeInfoWindow}
					getMarkerInfo = {this.getMarkerDetails}
				/>
				<div id='map' role='application' style={style}></div>
			</div>
		)
	}
}

export default Map
