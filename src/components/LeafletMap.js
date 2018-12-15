import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Leaflet from 'leaflet';
import { Map, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Collapseable from './Collapseable.js';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet/dist/leaflet.css';
import northamerica from '../assets/maps/northamerica.js';
import ghostIconImage from '../assets/image/ghost-icon.png';
//import $ from 'j-query';
//import '../index.css';
const centerCoord = [46.8797, -110.3626];
const northEastCorner = Leaflet.latLng(48.933, -103.868);
const southWestCorner = Leaflet.latLng(44.659, -103.925);
const bounds = Leaflet.latLngBounds(southWestCorner, northEastCorner);

const mapStyle = {
  height: '590px',
  width: 'auto',
  position: 'relative',
  outline: 'none',
  marginBottom: '10em',
  border: 'solid'
};

const ghostSingleIcon = new Leaflet.Icon({
  iconUrl: ghostIconImage,
  iconSize: [30, 30]
});

const ghostClusterIcon = new Leaflet.Icon({
  iconUrl: ghostIconImage,
  iconSize: [50, 50]
});

export default class LeafletMap extends React.Component {
  constructor(props) {
    super(props);
    this.features = [];
    this.markers = [];
    this.state = {
      data: '',
      markers: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/location/allGhost').then(res => {
      console.log(res);
      console.log(res.data);
      this.setState(
        {
          data: res.data,
          ready: true
        },
        () => this.generateMarkers()
      );
    });
  }

    generateFeatures() {
      for (let i = 0; i < northamerica.features.length; i++) {
        this.features.push(<GeoJSON key={i} data={northamerica.features[i]} style={this.borderStyle(northamerica.features[i])} />);
      }
    }

  generateMarkers() {
    for (let i = 0; i < this.state.data.length; i++) {
      this.markers.push(<Marker className="markers"
      key={i}
      riseOnHover={true}
      position={this.state.data[i].loc.coordinates}
      maxBounds={this.state.bounds}
      icon={ghostSingleIcon}
      bubblingMouseEvents={true}
      />);
    }
    this.setState({
      markers: this.markers
    });
  }

  borderStyle(feature) {
    if (feature.properties.STATE_NAME == 'Montana') {
      return { fillOpacity: 0, color: '#ffcc66' };
    } else {
      return { fillOpacity: .6, color: '#ffcc66', fillColor: 'black' };
    }
  }

  // onEachFeature(marker, layer) {
  //   layer.on({
  //     mouseover: this.highlightFeature.bind(this),
  //     mouseout: this.resetHighlight.bind(this),
  //     click: this.clickToFeature.bind(this)
  //   });
  // }
  //
  // clickToFeature(e) {
  //   var layer = e.target;
  //   console.log("I clicked on " + layer.data.place_name);
  //
  // }
  //
  // onMarkerClick(e) {
  //   marker_ID = this.e.marker.id;
  //   console.log("You clicked the marker " + marker_ID);
  //   return <Collapseable />
  // }

  render() {
    this.generateFeatures();

    return (
      <Map className="map" center={centerCoord} style={mapStyle} scrollWheelZoom={false} zoom={6.75} zoomSnap={0} zoomDelta={2} minZoom={6.75} maxZoom={20}  maxBoundsViscosity={1} >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          id="mapbox.streets"
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2hhcm9uZnVsbGVyIiwiYSI6ImNqcGJlZjk3ODA5ZnYzdnBodmh1c3ExZGcifQ.4ZhymN2kEj9qywb3P5f-1Q"
        />

        {this.features}

        <MarkerClusterGroup iconCreateFunction={() => ghostClusterIcon}>
          {this.state.markers}
          onEachFeature={this.onEachFeature}
        </MarkerClusterGroup>
      </Map>
    );
  }
}
