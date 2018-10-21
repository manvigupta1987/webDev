import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map'
import { GoogleApiWrapper } from 'google-maps-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="app-name">Welcome to neighborhood map</h1>
        </header>
        {
          this.props.loaded? (
            <Map google={this.props.google} />
          ) : (<div class="map-error"> Could'nt load google maps </div>)
        }
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAYb1WQLh2JaKpVrdZegH69tVAI2LH9gNs'
})(App)
