import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/review";
import * as bookingActions from "../../store/booking"
import { Modal } from '../../context/Modal'
import EditReview from '../EditReview';
import BookingForm from '../Bookings';
import Maps from '../Maps';
import './SpotPage.css'

function SpotPage() {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])


    const history = useHistory()
    const dispatch = useDispatch()

    const spotId = useRouteMatch("/spots/:spotId").params.spotId
    const spot = useSelector((state) => state.spots.spot)

    const user = useSelector((state) => state.session.user)
    const userId = user?.id
    const ownerId = spot.ownerId

    const reviews = useSelector((state) => Object.values(state.reviews))
    const bookings = useSelector((state) => Object.values(state.bookings.spotBookings))


    //useState for spots
    const [edit, setEdit] = useState(false)
    const [editting, setEditting] = useState(false)
    const [destroy, setDestroy] = useState(false)

    //useState for editting spots
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)


    //useState for editting spots
    const [errors, setErrors] = useState([])
    const [passed, setPassed] = useState(false)

    //useState for creating reviews
    const [showModal, setShowModal] = useState(false)
    const [hasReview, setHasReview] = useState(false)
    const [review, setReview] = useState()
    const [stars, setStars] = useState()


    const addressRegex = /^[a-zA-Z0-9\s\,\''\-]*$/
    const alphaRegex = /^[a-zA-Z ]*$/


    //useEffect for creating errors while editting

    useEffect(() => {
        let error = []
        if (stars === undefined || stars <= 0) error.push ("Please select star rating")
        if (review?.length <= 0) error.push ("Your review is empty")

        setErrors(error)
        setPassed(false)
        if (error.length === 0) setPassed(true)
    }, [stars, review])


    useEffect(() => {

        let error = []

        if (!addressRegex.test(address)) error.push("Please enter a valid address")
        if (!alphaRegex.test(city)) error.push("City cannot contain numbers")
        if (!alphaRegex.test(state)) error.push("State cannot contain numbers")
        if (!alphaRegex.test(country)) error.push("Country cannot contain numbers")
        if (+lat < -90 || +lat > 90) error.push("latitude must be between -90 and 90")
        if (+lng < -180 || +lng > 180) error.push("longitude must be between -180 and 180")
        if (name && name?.length > 30) error.push("Please keep name under 30 characters")
        if (description?.length < 20) error.push("Please provide more description")
        if (price < 0) error.push("You cannot have a negative dollar amount for price")

        setErrors(error)
        setPassed(false)

        if (error.length === 0) setPassed(true)

    }, [address, city, state, country, lat, lng, name, description, price])

    //dispatch for all reviews
    useEffect(() => {
        dispatch(reviewActions.getReviews(spotId))
    }, [dispatch, showModal, spotId])

    //dispatch for all spot bookings
    useEffect(() => {
        dispatch(bookingActions.getSpotBookings(spotId))
    }, [dispatch, spotId])


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

    //useEffect to check if user already left a review here
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

    const ratingIndex = [1, 2, 3, 4, 5]

    //save click for updating spot
    const handleSpotSaveClick = async (e) => {
        e.preventDefault()
        if (passed === true) {

            const payload = {address, city, state, country, lat, lng, name, description, price}

            let spot = await dispatch(spotActions.updateSpot(spotId, payload))

            if (spot) {
                history.push(`/spots/${spotId}`)
            }
            setEditting(false)
            setPassed(false) ///////////////////////////////////////////////////
        }
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
        if (passed === true) {

            const payload = {review, stars:+stars}
            let res = await dispatch(reviewActions.newReview(spotId, payload, user))
            let ratingUpdate = await dispatch(spotActions.updateStarRating(spotId))
            if (res) {
                setReview("")
                setStars("")
                setShowModal(false)
            }
            setPassed(false)
        }
    }


    return (

    <div className="spot-container">
        <div className="spacer"></div>
          <div className="spot-page-top">
                <h1>{spot?.name}</h1>
                <span>{`★ ${spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : "New" }`} · {`${spot.numReviews} reviews`} . {spot?.city}, {spot?.state}, {spot?.country}</span>
            </div>
        {
        editting ?
        <div>
            <div className="spot-page">

                <div className="spot-page-images">
                    {spot?.SpotImages?.map(image =>(
                    <div>
                        <img key={image.id} src={image.url}/>
                    </div>
                        ))}
                </div>

            </div>
        <section className="edit-spot-form-container">
            <p>You are currently editting</p>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
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
            </form>
            <div className="edit-spot-button-container">
                <button type="button" onClick={handleSpotCancelClick}>Cancel</button>
                <button type="button" onClick={handleSpotSaveClick}>Save</button>
            </div>
        </section>
        </div>

        :

        <div className="spot-page">

            <div className="spot-page-images">
                {spot?.SpotImages?.map(image =>(
                    <img className="spot-image" key={image.id} src={image.url}/>
                ))}
            </div>
        <div className="edit-button-container">
            {
            !editting && edit ?
            <button className="spot-edit-button"type="submit" onClick={handleSpotEditClick}>Edit Spot</button>
            :
            null
        }
        {
            !editting && destroy ?
            <button className="spot-edit-button" type="button" onClick={handleSpotDeleteClick}>Delete Spot</button>
            :
            null
        }
            </div>
            <div className="spot-page-details">
                <h1>Description</h1>
                <p>{spot?.description}</p>
            </div>
                <h1>Reviews</h1>
            <div className="create-review-container">
                {
                hasReview ? null :
                <section className="create-review">
                    <ul>
                         {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <form onSubmit={handleReviewSaveClick} className="create-review-container">
                    <div className="stars-container">
                    <span> Rating: </span>
                        {ratingIndex.map((star) => {
                            let index = ratingIndex.indexOf(star) + 1
                            return (
                                    <button
                                    type="button"
                                    key={index}
                                    className = {+index <= +stars ? "on": "off"}
                                    onClick={() => setStars(index)}
                                    >
                                    <div className="star">&#9733;</div>
                                    </button>
                            )
                        })}
                    </div>
                        <input
                            type="text"
                            placeholder="Type review here"
                            required
                            value={review}
                            onChange={updateReview}
                        />
                        <div>
                            <button className="save-Review-Button" type="submit">Save</button>
                        </div>
                    </form>
                </section>
                }

            </div>
            <div className="reviews-container">
                {reviews && reviews.length > 0 ? reviews?.map(review =>
                    <div className="review" key={review.id}>
                        <div className="review-content">
                            <h3>{review?.User?.firstName}</h3>
                            <p>{`${review?.stars} ★`}</p>
                            <p>{review?.review}</p>
                        {
                            reviewOwner(review?.User?.id)?
                            <div className="monkey" key={`review_${review?.id}`}>
                            <button className="review-edit-button" type="button" onClick={handleReviewEditClick}>Edit Review</button>
                            { showModal &&
                            <Modal onClose={() => setShowModal(false) }>
                                <EditReview clearErrors={setErrors} currentReview={review.review} currentRating={review.stars} setShowModal={setShowModal} setHasReview={setHasReview} reviewId={review.id} spotId={spotId} user={user}/>
                            </Modal>
                            }
                            </div>
                            :
                            null
                        }
                        </div>
                    </div>
                    ): <div className={"review-content"}>No reviews yet</div>}
            </div>
            <BookingForm bookings={bookings} spot={spot}/>
            <Maps spot={spot}/>
        </div>
        }



    </div>
    )
}

export default SpotPage
