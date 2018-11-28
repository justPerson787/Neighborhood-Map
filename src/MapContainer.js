import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Modal from 'react-responsive-modal';
import ImagesAP from './ImagesAP.js';


const map_Key = "AIzaSyAD282YtNT5yIr79A9vtGC-qBC2c0WXUdk";

export class MapContainer extends React.Component {
    
    state = {
        zoom: 12,
        center: {
            lat: 39.1031,
            lng: -84.5120
        },
        showingInfoWindow: false,
        activeMarker: {markerName:'none'},
        animation: null, 
        open: true,            
    }

    // Animation effect with marker on click
    onMarkerClick = (props, marker, e) =>
        
        this.setState({
            selectedMarker: props,
            activeMarker: marker,
            showingInfoWindow: true,
            open: true,
            
        });
        
        
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: {markerName:'none'}
            
          })
        }
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() { 
        console.log(this.state.activeMarker.name)
                
        return (
            <div>
                <Map 
                    aria-label="map"
                    role="application"
                    google={this.props.google}
                    initialCenter={this.state.center}
                    zoom={this.state.zoom}
                    onClick = {this.onMapClicked}
                >                
                    
                    {this.props.places.map((marker) => 
                        <Marker 
                            key={marker.id}
                            markerName={marker.name}
                            name = {marker.name}                            
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            onClick={this.onMarkerClick}
                            animation={this.state.activeMarker.markerName === marker.name &&this.props.google.maps.Animation.BOUNCE} 
                                                                             

                        />
                        
                    )}

                    <div>
                        <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div><ImagesAP name2={this.state.activeMarker.name}/></div>
                        </Modal>
                    </div>
                                        

                    {/*<InfoWindow 
                        visible = {this.state.showingInfoWindow}
                        marker = {this.state.activeMarker}     >                            
                        <div>some text</div>
                    </InfoWindow>*/}

                    
                    
                </Map>
            </div>
            
        );
    }
}
  
export default GoogleApiWrapper({
    apiKey: map_Key
})(MapContainer)
    

