import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import * as spotActions from "../../store/spots";
import './Spots.css'

function Spots() {

    const dispatch = useDispatch()

    const spots = Object.values(useSelector((state) => state.spots))


    useEffect(() => {
        dispatch(spotActions.getSpots())
    }, [dispatch])

    return(
        <>
        <h1>SPOT LIST</h1>
        <div className="spotsContainer">
            {spots?.map(spot =>
                <div className="spotCard" key={spot.id}>
                    <img src={`${spot.previewImage}`}></img>
                    <span id="cityandstate">`{spot.city}, {spot.state}`</span>
                    <span id="distance">distance will go here</span>
                    <span id="availability">future availability here</span>
                    <span id="cost">{spot.price}</span>
                </div>
            )}
        </div>
        </>
    )
}

export default Spots
