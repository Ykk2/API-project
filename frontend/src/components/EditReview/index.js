import React, { useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from "../../store/review";



function EditReview ({setShowModal, setHasReview, reviewId, spotId}) {

    const history = useHistory()
    const dispatch = useDispatch()

    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")

    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)

    const handleCancelClick = (e) => {
        e.preventDefault()
        setShowModal(false)
    }

    const handleSaveClick  = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const payload = {review, stars:+stars}
        let res = await dispatch(reviewActions.updateReview(reviewId, payload))
        if (res) {

            history.push(`/spots/${spotId}`)

        }
    }


    const handleDeleteClick = async (e) => {
        e.preventDefault()
        let res = await dispatch(reviewActions.removeReview(reviewId))
        if (res) {
            history.push(`/spots/${spotId}`)
            setHasReview(true)
        }
    }


    return (
        <div>
            <section className="edit-spot-form-container">
            <form className="edit-spot-form">
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
            <button type="button" onClick={handleCancelClick}>Cancel</button>
            <button type="button" onClick={handleSaveClick}>Save</button>
            <button type="button" onClick={handleDeleteClick}>Delete Review</button>
            </div>
            </form>
        </section>
        </div>
    )
}

export default EditReview
