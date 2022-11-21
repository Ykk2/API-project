import React, { useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from "../../store/review";



function EditReview ({setShowModal, setHasReview, reviewId, spotId, user}) {

    const history = useHistory()
    const dispatch = useDispatch()

    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const ratingIndex = [1, 2, 3, 4, 5]

    const updateReview = (e) => setReview(e.target.value)


    const handleCancelClick = (e) => {
        e.preventDefault()
        setShowModal(false)
    }

    const handleSaveClick  = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const payload = {review, stars:+stars}
        let res = await dispatch(reviewActions.updateReview(reviewId, payload, user))
        if (res) {
            history.push(`/spots/${spotId}`)
            setShowModal(false)
        }
    }


    const handleDeleteClick = async (e) => {
        e.preventDefault()
        let res = await dispatch(reviewActions.removeReview(reviewId))
        if (res) {
            setHasReview(false)
        }
    }


    return (
        <div>
            <section className="edit-spot-form-container">
            <form onSubmit={handleSaveClick} className="edit-spot-form">
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
            <div>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
            <button type="submit" >Save</button>
            <button type="button" onClick={handleDeleteClick}>Delete Review</button>
            </div>
            </form>
        </section>
        </div>
    )
}

export default EditReview
