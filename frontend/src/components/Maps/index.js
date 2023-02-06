import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode'
import homeMarker from '../../assets/icons/imagevector.svg'
import './maps.css'

const Maps = ({ spot }) => {

    //This sets the center of the map. This must be set BEFORE the map loads

    const [currentPosition, setCurrentPosition] = useState()

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);
    // set response language. Defaults to english.
    Geocode.setLanguage('en');

    Geocode.setLocationType('ROOFTOP');

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API
    })

    const containerStyle = {
        width: '100%',
        height: '30em'
    };

    // useEffect(() => {
    //     if (spot) setCurrentPosition({lng: spot.lng, lat: spot.lat})
    // }, [spot])


    // useEffect(() => {
    //     const makeMap = () => {
    //         Geocode.fromAddress(`${spot.city}`).then(
    //             (response) => {
    //                 const { lat, lng } = response.results[0].geometry.location;
    //                 setCurrentPosition({lat, lng})

    //             }
    //         );
    //     };
    //     makeMap()
    // }, []);

    const [map, setMap] = useState(null)

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    console.log(currentPosition)

    return (
        <>

            <div className="map_page__container">
                <div style={{ height: '30em', width: '100%' }}>
                    {isLoaded &&
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            zoom={10}
                            center={{lng: -(+spot.lng), lat: +spot.lat}}
                            onUnmount={onUnmount}
                        >
                        <Marker key={spot.id}
                            position={{lng: -(+spot.lng), lat: +spot.lat}}
                            title={spot.name}
                            icon={homeMarker}
                            streetView={false}
                            id="spot-marker" />

                        </GoogleMap>}
                </div>

            </div>
        </>
    );

}

export default Maps
