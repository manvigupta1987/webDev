import React, { Component } from 'react'
import PlacesList from './PlacesList'
import foursquareImg from '../images/foursquare.png'
import selectedMarker from '../images/dinner_selected.png'
import markerImg from '../images/dinner.png'

class Map extends Component {

  state = {
    map: '',
    infoWindow : {},
    //locations
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
          'title': "Blaze Pizza",
          'type': "restaurant",
          'position': {
            'lat': 35.808201,
            'lng': -78.815754
          },
          'placeId': '54924d06498ed496ec027844'
        },
        {
          'title': "Salsa Fresh Mexican Grill",
          'type': "restaurant",
          'position': {
            'lat': 35.81955957701481,
            'lng': -78.84712907121657
          },
          'placeId': '4b2ea5f1f964a5203fe424e3'
        },
        {
          'title': "Guasaca Arepa & Salsa Grill",
          'type': "restaurant",
          'position': {
            'lat': 35.81458456976749,
            'lng': -78.82051214986485
          },
          'placeId': '589667d0fc5a5f6cdac4e2f9'
        },
        {
          'title': "Bad Daddy's Burger Bar",
          'type': "restaurant",
          'position': {
            'lat': 35.807784153529916,
            'lng': -78.81875570351734
          },
          'placeId': '529a59be11d2c01eeb1e870c'
        },
        {
          'title': "Los Tres Magueyes",
          'type': "restaurant",
          'position': {
            'lat': 35.85964135016202,
            'lng': -78.82023513801217
          },
          'placeId': '561be1c0498e87aa738b74be'
        },
        {
          'title': "BabyMoon Cafe",
          'type': "restaurant",
          'position': {
            'lat': 35.85106945570956,
            'lng': -78.82693614423596
          },
          'placeId': '4b046caff964a520105422e3'
        }],
        oldMarker: ''
  }
  componentDidMount () {
    this.initMap()
  }

  /* function is used to get the marker details using the foursquare api.
  *@param: location
  */
  getMarkerDetails = (location)=> {
    const client_secret = 'YJQZ5FTKIA5UHUDU2BNACLRW14WZBDQLOO0KIWNSBUC2QN4V'
    const client_id = 'CFSMRM4YK0LMFIZIOO1ETN50A1TXPJENSO3EUOIEBXK3E5ER'
    const foursquareUrl = `https://api.foursquare.com/v2/venues/${location.placeId}?client_id=${client_id}&client_secret=${client_secret}&v=20181018`

    //fetch foursquare url for each place id to show the details.
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
                <p class="markerInfo"><strong><em>hours: </em></strong>${venue.hours ? venue.hours.status : "hours not available"}</p>
                <p class="markerInfo">${venue.rating ? '<strong><em>Rating: </em></strong>'+ venue.rating: ''}</p>
                <p class="markerInfo"><a href='${venue.canonicalUrl}' target='_blank'>Read more</a></p>
                <img class="foursquare-image"src=${foursquareImg} alt="Powered By foursquare"/>
                </div>`)
            })
      })
      .catch((err) => {
        this.state.infoWindow.setContent("No result found")
      })

  }
  /* function to set the icon image of the marker.
  *@param: marker: marker object
  *@param: iconImg : image of the marker
  */
  setMarkerIcon = (marker, iconImg)=>{
    marker.setIcon(iconImg)
    this.state.map.panTo(marker.getPosition())
  }

  setMarkers = (map) =>{
    const mapLocations = this.state.locations.map((location) =>{
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(location.position),
        animation: window.google.maps.Animation.DROP,
        map,
        title:location.title
      })
      marker.setIcon(markerImg);
      location.longName = `${location.title}`
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

  /* function to set or unset the animation when marker is clicked
  *@param: marker object
  */
  toggleBounce = (marker)=> {
    if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => {marker.setAnimation(null);}, 300)
        }
    }

  /* function to open the marker details window when marker is clicked
  *@param: marker
  */
  openInfoWindow = (marker)=>{
    this.closeInfoWindow()
    this.state.infoWindow.open(this.state.map, marker)
    this.state.infoWindow.setContent(marker.title)
    this.toggleBounce(marker)
    marker.setIcon(selectedMarker)
    this.setState({oldMarker: marker})
    this.state.map.panTo(marker.getPosition())
  }

  /* function to close the marker details window when marker is clicked
  *@param: marker
  */
  closeInfoWindow = () => {
    if(this.state.oldMarker){
      this.state.oldMarker.setIcon(markerImg)
      this.toggleBounce(this.state.oldMarker)
    }
    this.setState({oldMarker: ''})
      this.state.infoWindow.close()
    }

  /* function to load the map and infowindow*/
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
          setMarkerIcon = {this.setMarkerIcon}
        />
        <div id='map' role='application' style={style}></div>
      </div>
    )
  }
}

export default Map
