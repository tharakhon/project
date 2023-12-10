import React, { Component } from 'react';
import './App.css';
import { longdo, map, LongdoMap } from './LongdoMap';

class MapShow extends Component {

  initMap(){
    map.Layers.setBase(longdo.Layers.GRAY);
    
  }

  // make sure to use different map key: https://map.longdo.com/api
  render() {
    const mapKey = 'e4e873a86d89295b2f1ac95fa5c5154e'
    return (
      <div style={{display: 'flex'}}>
        <LongdoMap id="longdo-map" mapKey={mapKey} callback={this.initMap} />
      </div>
    );
  }
}

export default MapShow;