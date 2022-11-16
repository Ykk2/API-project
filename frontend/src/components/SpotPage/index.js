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
    const [editting, setEditting] = useState(false)
    const [destroy, setDestroy] = useState(false)

    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(spotActions.getSpot(spotId))

        if (userId === ownerId) {
            setEdit(true)
            setDestroy(true)
        } else {
            setEdit(false)
            setDestroy(false)
        }

    }, [dispatch, userId, ownerId])


    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [country, setCountry] = useState()
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()

    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateLat = (e) => setLat(e.target.value)
    const updateLng = (e) => setLng(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)

    const handleSaveClick = async (e) => {
        e.preventDefault()
        const payload = {address, city, state, country, lat, lng, name, description, price}

        let spot = await dispatch(spotActions.updateSpot(spotId, payload))

        if (spot) {
            history.push(`/spots/${spotId}`)
        }
        setEditting(false)
    }

    const handleCancelClick = (e) => {
        e.preventDefault()
        setEditting(false)
        history.push(`/spots/${spot.id}`)
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        let res = await dispatch(removeSpot(spotId))
        if (res) {
            history.push(`/`)
        }
    }

    const handleEditClick = async (e) => {
        e.preventDefault()
        setEditting(true)
    }


    return (
    <div>
        {
        editting ?

        <section className="edit-spot-form-container">
            <form className="edit-spot-form">
                <input
                type="text"
                placeholder="address"
                required
                value={address}
                onChange={updateAddress}
                />
               <input
                type="text"
                placeholder="city"
                required
                value={city}
                onChange={updateCity}
                />
                <input
                type="text"
                placeholder="state"
                required
                value={state}
                onChange={updateState}
                />
                <input
                type="text"
                placeholder="country"
                required
                value={country}
                onChange={updateCountry}
                />
                <input
                type="number"
                placeholder="lat"
                required
                value={lat}
                onChange={updateLat}
                />
                <input
                type="number"
                placeholder="lng"
                required
                value={lng}
                onChange={updateLng}
                />
                <input
                type="text"
                placeholder="name"
                required
                value={name}
                onChange={updateName}
                />
                <input
                type="text"
                placeholder="description"
                required
                value={description}
                onChange={updateDescription}
                />
                 <input
                type="integer"
                placeholder="price"
                min="0"
                required
                value={price}
                onChange={updatePrice}
                />
            <div>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
            <button type="button" onClick={handleSaveClick}>Save</button>
            </div>
            </form>
        </section>

        :

        <div className="spot-page">
            <h1>{spot?.name}</h1>
            <div className="spot-page-images">
                {spot?.SpotImages?.forEach(image => {
                    <img key={image.id} src={image.url}/>
                })}
            </div>
            <div className="spot-page-details">
                <h1>Description</h1>
                <p>{spot?.address}</p>
                <p>{spot?.city}, {spot?.state}</p>
                <p>{spot?.description}</p>
            </div>
        </div>
        }

        {
            !editting && edit ?
            <button type="submit" onClick={handleEditClick}>Edit</button>
            :
            null
        }
        {
            !editting && destroy ?
            <button type="button" onClick={handleDeleteClick}>Delete</button>
            :
            null
        }

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
