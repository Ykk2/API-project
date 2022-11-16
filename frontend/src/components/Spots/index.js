import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import * as spotActions from "../../store/spots";
import './Spots.css'

function Spots() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(spotActions.getSpots())
    }, [dispatch])

    const spots = Object.values(useSelector((state) => state.spots.spots))

    return(
        <>
        <h1>SPOT LIST</h1>
        <div className="spotsContainer">
            {spots?.map(spot =>
                <div className="spotCard" key={spot?.id}>
                    <Link to={`/spots/${spot?.id}`}>
                    <img src={`${spot?.previewImage}`}></img>
                    <span id="cityandstate">`{spot?.city}, {spot?.state}`</span>
                    <span id="distance">distance will go here</span>
                    <span id="availability">future availability here</span>
                    <span id="cost">{spot?.price}</span>
                    </Link>
                </div>
            )}
        </div>
        </>
    )
}

export default Spots
