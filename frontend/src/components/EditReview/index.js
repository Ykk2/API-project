import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from "../../store/review";
import * as spotActions from "../../store/spots";
import './EditReview.css'


function EditReview ({currentReview, setShowModal, spot}) {

    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.session.user)

    const [review, setReview] = useState(currentReview.review)
    const [stars, setStars] = useState(+currentReview.stars)
    const ratingIndex = [1, 2, 3, 4, 5]

    const [errors, setErrors] = useState([])
    const [passed, setPassed] = useState(false)

    useEffect(() => {
        let error = []
        if (stars === undefined || stars <= 0) error.push ("Please select star rating")
        if (review?.length <= 0) error.push ("Your review is empty")

        setErrors(error)
        setPassed(false)
        if (error.length === 0) setPassed(true)
    }, [stars, review])


    const updateReview = (e) => setReview(e.target.value)


    const handleCancelClick = (e) => {
        e.preventDefault()
        setShowModal(false)
    }

    const handleSaveClick  = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (passed === true) {
            const payload = {review, stars:+stars}
            let res = await dispatch(reviewActions.updateReview(currentReview.id, payload, user))
            let ratingUpdate = await dispatch(spotActions.updateStarRating(spot.id))
            if (res) {
                setShowModal(false)
            }
            setPassed(false)
        }
    }


    const handleDeleteClick = (e) => {
        e.preventDefault()
        dispatch(reviewActions.removeReview(currentReview.id))
        setShowModal(false)
    }


    return (
        <div className="review-edit-modal">
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <section className="edit-review-form-container">
            <form onSubmit={handleSaveClick} className="edit-review-form">
            <div className="stars-container"> Rating:
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
            <div className="edit-review-buttons">
            <button type="button" onClick={handleCancelClick}>Cancel</button>
            <button type="submit" >Save</button>
            <button type="button" onClick={handleDeleteClick}>Delete</button>
            </div>
            </form>
        </section>
        </div>
    )
}

export default EditReview
