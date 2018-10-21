import React from 'react';
import './App.css';
import Map from './Components/Map'
import { GoogleApiWrapper } from 'google-maps-react'

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-name">Welcome to neighborhood map</h1>
      </header>
      <main role='main'>
      {
        props.loaded? (
          <Map google={props.google} />
        ) : (<div class="map-error"> Could'nt load google maps </div>)
      }
      </main>
      </div>
    );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAYb1WQLh2JaKpVrdZegH69tVAI2LH9gNs'
})(App)
