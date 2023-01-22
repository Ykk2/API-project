import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode'



const Maps = ({spot}) => {

    //This sets the center of the map. This must be set BEFORE the map loads

    const [currentPosition, setCurrentPosition] = useState()

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);
	// set response language. Defaults to english.
	Geocode.setLanguage('en');

	Geocode.setLocationType('ROOFTOP');

	// Enable or disable logs. Its optional.
	Geocode.enableDebug();
	useEffect(() => {
		// Get latitude & longitude from address
		const makeMap = () => {
			Geocode.fromAddress(`${spot.address}, ${spot.city}`).then(
				(response) => {
					const { lat, lng } = response.results[0].geometry.location;
					setCurrentPosition({ lat, lng });
				},
				(error) => {
					console.error(error);
				}
			);
		};

		makeMap();
	}, []);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API
    })
{/* <i class="fa-solid fa-location-dot"></i> */}

    const containerStyle = {
        width: '800px',
        height: '800px'
    };


    const [map, setMap] = useState(null)

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])


    return (
        <>
        </>
        // Important! Always set the container height explicitly

        // <div className="map_page__container">

        //     <div style={{ height: '900px', width: '900px' }}>
        //         {isLoaded && <GoogleMap
        //             mapContainerStyle={containerStyle}
        //             zoom={8}
        //             center={currentPosition}
        //             onUnmount={onUnmount}
        //         >
        //             {/* <Marker key={marker.id}
        //                 position={{ lat: marker.lat, lng: marker.lng }}
        //                 title={marker.name}
        //                 icon={{
        //                     path: 'M 100 100 L 300 100 L 200 300 z',
        //                     fillColor: marker.color,
        //                     fillOpacity: 1,
        //                     scale: .2,
        //                     strokeColor: 'gold',
        //                     strokeWeight: 2
        //                 }}
        //                 streetView={false} /> */}
        //         </GoogleMap>}
        //     </div>

        // </div>
    );

}

export default Maps
