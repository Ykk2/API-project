import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { removeSpot } from '../../store/spots';
import * as spotActions from "../../store/spots";



function SpotPage() {

    const spotId = useRouteMatch("/spots/:spotId").params.spotId
    const spot = useSelector((state) => state.spots.spot)

    const userId = useSelector((state) => state.session.user.id)
    const ownerId = spot.ownerId

    const [edit, setEdit] = useState(false)
    const [destroy, setDestroy] = useState(false)

    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(spotActions.getSpot(spotId))
    }, [dispatch])






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

    //
    const handleDeleteClick = async (e) => {
        e.preventDefault()
        let res = await dispatch(removeSpot(spotId))
        if (res) {
            history.push('/')
        }
    }

    return (
        <div className="spot-page">
            <h1>{spot?.name}</h1>
            <div className="spot-page-images">
                {/* {spot?.SpotImages.forEach(image => {
                    <img key={image.id} src={image.url}/>
                })} */}
            </div>
            <div className="spot-page-details">
                <h1>Description</h1>
                <p>{spot?.address}</p>
                <p>{spot?.city}, {spot?.state}</p>
                <p>{spot?.description}</p>
            </div>
            <button type="submit" >Edit</button>
            <button type="button" onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}

export default SpotPage

{/* <button type="submit" onClick = {handleEditClick}>Edit</button>
<button type="button" >Delete</button> */}

// /* <div className="spot-reviews">
// <div>
//     <span>{spot.avgStarRating}, ({spot.numReviews})</span>
// </div>
// {reviews.forEach(review => {
//     <div key={review.id} className="review">
//         <p>{review.User.firstName}</p>
//         <p>{review.createdAt}</p>
//         <p>{review.review}</p>
//     </div>
// })}
// </div>
