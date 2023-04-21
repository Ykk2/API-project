import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import Carousel from '../Spots/carousel/carousel';
import items from '../Spots/carousel/icons';
import * as spotActions from "../../store/spots";
import './Spots.css'

function Spots() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(spotActions.getSpots())
    }, [dispatch])

    const spots = useSelector((state) => Object.values(state.spots.spots))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Fragment>
            <Carousel items={items} />
            <div className="spotsContainer">
                {spots?.map(spot =>
                    <div className="spotCard" key={spot?.id}>
                        <Link to={`/spots/${spot?.id}`} style={{ textDecoration: 'none' }}>
                            <div className="image-container">
                                <img src={`${spot?.previewImage}`}></img>
                            </div>
                            <div className="details-container">
                                <div className='details-container-top'>
                                    <p id="cityandstate">{`${spot?.city}, ${spot?.state}`}</p>
                                    <p id="avgRating">{` ${spot.avgRating ? `★ ${Number(spot.avgRating).toFixed(1)}` : "New"}`}</p>
                                </div>
                                <p id="cost">${spot?.price}<span>&nbsp;night</span></p>
                            </div>
                        </Link>
                    </div>
                )}
            </div>

        </Fragment>

    )
}

export default Spots
