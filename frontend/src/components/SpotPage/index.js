import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


const SpotPage = () => {
    // const sessionUser = useSelector(state => state.session.user);
    const {id} = useParams
    const spot = useSelector((state) => state.find((item) => {item.id === +id})) //change this to hit different endpoint

    const dispatch = useDispatch()
    const history = useHistory()

    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     const payload = {address, city, state, country, lat, lng, name, description, price}


    //     let spot = await dispatch(newSpot(payload))

    //     if (spot) {
    //         history.push(`/spots/${spot.id}`)
    //     }
    // }

    // const handleCancelClick = (e) => {
    //     e.preventDefault()
    //     history.push(`/spots/${spot.id}`)
    // }

    return (
        <div className="spot-page">
            <div className="spot-page-images">
                {spot.SpotImages.forEach(image => {
                    <img key={image.id} src={image.url}/>
                })}
            </div>
            <div className="spot-details">

            </div>
            <button type="submit">Edit</button>
            <button type="button" onClick={handleDeleteClick}>Delete</button>
        </div>
    )

}

export default SpotPage
