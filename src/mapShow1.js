import React, { Component } from 'react';
import './App.css';
import LongdoMap, { longdo, map } from './LongdoMap1';

class MapShow1 extends Component {
  
  initMap(){
    map.Layers.setBase(longdo.Layers.GRAY);
  }

  render() {
    const mapKey = 'e4e873a86d89295b2f1ac95fa5c5154e'
    return (
      <div>
        <LongdoMap id="longdo-map" mapKey={mapKey} callback={this.initMap} />
      </div>
    );
  }
}

export default MapShow1;
