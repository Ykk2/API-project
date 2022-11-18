import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { removeSpot } from '../../store/spots';
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/review";
import { Modal } from '../../context/Modal'
import EditReview from '../EditReview';
import './SpotPage.css'

function SpotPage() {

    const history = useHistory()
    const dispatch = useDispatch()

    const spotId = useRouteMatch("/spots/:spotId").params.spotId
    const spot = useSelector((state) => state.spots.spot)

    const user = useSelector((state) => state.session.user)
    const userId = user.id
    const ownerId = spot.ownerId

    const reviews = Object.values(useSelector((state) => state.reviews))


    //useState for spots
    const [edit, setEdit] = useState(false)
    const [editting, setEditting] = useState(false)
    const [destroy, setDestroy] = useState(false)

    //useState for creating spots
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")


    //useState for creating reviews
    const [showModal, setShowModal] = useState(false)
    const [hasReview, setHasReview] = useState(false)
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")

    //dispatch for all reviews
    useEffect(() => {
        dispatch(reviewActions.getReviews(spotId))
    }, [dispatch, showModal, spotId])



    //useEffect for getting loading this spot and determine if user is the owner
    useEffect(() => {
        dispatch(spotActions.getSpot(spotId))

        if (userId === ownerId) {
            setEdit(true)
            setDestroy(true)
            setHasReview(true)
        } else {
            setEdit(false)
            setDestroy(false)
        }

    }, [dispatch, userId, ownerId, spotId])


    useEffect(() => {
        const found = reviews.find(review => review.User.id === userId)
        if (found) {
            setHasReview(true)
        }
    }, [reviews, userId])




    //function returning boolean for determining if user is the owner of the review
    const reviewOwner = (id) => (
        userId === id
    )

    //setters for creating spot form.
    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateLat = (e) => setLat(e.target.value)
    const updateLng = (e) => setLng(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)


    //setters for creating review
    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)

    //save click for updating spot
    const handleSpotSaveClick = async (e) => {
        e.preventDefault()
        const payload = {address, city, state, country, lat, lng, name, description, price}


        let spot = await dispatch(spotActions.updateSpot(spotId, payload))


        if (spot) {
            history.push(`/spots/${spotId}`)
        }
        setEditting(false)
    }

    //cancel click for cancelling updating spot
    const handleSpotCancelClick = (e) => {
        e.preventDefault()
        setEditting(false)
        history.push(`/spots/${spot.id}`)
    }

    //delete click for deleting spot
    const handleSpotDeleteClick = async (e) => {
        e.preventDefault()
        let res = await dispatch(spotActions.removeSpot(spotId))
        if (res) {
            history.push(`/`)
        }
    }

    //edit click to initiate spot edit form
    const handleSpotEditClick = async (e) => {
        e.preventDefault()
        setEditting(true)
    }


    //edit click to edit review and initiate review edit modal
    const handleReviewEditClick = async (e) => {
        e.preventDefault()
        setShowModal(true)
    }

    //create click to create new review
    const handleReviewSaveClick = async (e) => {
        e.preventDefault()
        const payload = {review, stars:+stars}
        let res = await dispatch(reviewActions.newReview(spotId, payload, user))
        if (res) {
            setReview("")
            setStars("")
            setShowModal(false)
        }
    }


    return (
    <div className="spot-container">
        {
        editting ?
        <div>
            <div className="spot-page">
                <h1>{spot?.name}</h1>
                <div className="spot-page-images">
                    {spot?.SpotImages?.map(image =>(
                    <div>
                        <img key={image.id} src={image.url}/>
                        <p>spot images go here</p>
                    </div>
                        ))}
                </div>
            </div>
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
            <button type="button" onClick={handleSpotCancelClick}>Cancel</button>
            <button type="button" onClick={handleSpotSaveClick}>Save</button>
            </div>
            </form>
        </section>
        </div>

        :

        <div className="spot-page">
            <h1>{spot?.name}</h1>
            <span>{spot.avgStarRating}, ({spot.numReviews})</span>
            <div className="spot-page-images">
                {spot?.SpotImages?.map(image =>(
                    <div>
                    <img key={image.id} src={image.url}/>
                    <p>spot images go here</p>
                    </div>
                ))}
            </div>
            <div className="spot-page-details">
                <h1>Description</h1>
                <p>{spot?.address}</p>
                <p>{spot?.city}, {spot?.state}</p>
                <p>{spot?.description}</p>
            </div>
            <div className="review-container">
                <h1>Reviews</h1>
                {
                hasReview ? null :
                <section className="create-review">
                    <form onSubmit={handleReviewSaveClick} className="create-review-container">
                        <input
                            type="number"
                            placeholder="Stars"
                            required
                            value={stars}
                            onChange={updateStars}
                        />
                        <input
                            type="text"
                            placeholder="Type review here"
                            required
                            value={review}
                            onChange={updateReview}
                        />
                        <div>
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </section>
                }
                {reviews && reviews.length > 0 ? reviews?.map(review =>
                <div className="review" key={review.id}>
                    <div className="review-content">
                        <p>{review?.User?.firstName}</p>
                        <p>{review?.stars}</p>
                        <p>{review?.review}</p>
                    {
                        reviewOwner(review?.User?.id)?
                        <div key={`review_${review?.id}`}>
                        <button type="button" onClick={handleReviewEditClick}>Edit Review</button>
                        { showModal &&
                        <Modal onClose={() => setShowModal(false) }>
                             <EditReview setShowModal={setShowModal} setHasReview={setHasReview} reviewId={review.id} spotId={spotId} user={user}/>
                        </Modal>
                        }
                        </div>
                        :
                        null
                    }
                    </div>
                </div>
                ): <div>No reviews yet</div>}
            </div>

        </div>
        }

        {
            !editting && edit ?
            <button type="submit" onClick={handleSpotEditClick}>Edit Spot</button>
            :
            null
        }
        {
            !editting && destroy ?
            <button type="button" onClick={handleSpotDeleteClick}>Delete Spot</button>
            :
            null
        }

    </div>
    )
}

export default SpotPage
