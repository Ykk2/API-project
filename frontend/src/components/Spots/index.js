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
        <div className="spotsContainer">
            {spots?.map(spot =>
                <div className="spotCard" key={spot?.id}>
                    <Link to={`/spots/${spot?.id}`} style={{textDecoration:'none'}}>
                    <div className="image-container">
                        <img src={`${spot?.previewImage}`}></img>
                    </div>
                    <div className="details-container">
                        <div className='details-container-top'>
                            <p id="cityandstate">{`${spot?.city}, ${spot?.state}`}</p>
                            <p id="avgRating">{` ${spot.avgRating? `★ ${spot.avgRating}`: "New"}`}</p>
                        </div>
                        <p id="cost">{`$${spot?.price} /night`}</p>
                    </div>
                    </Link>
                </div>
            )}
        </div>
        </>
    )
}

export default Spots
