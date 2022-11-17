import React, { useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import * as reviewActions from "../../store/review";


function EditReview ({setShowModal, reviewId}) {


    const handleCancelClick = (e) => {
        e.preventDefault()
        setShowModal(false)
    }

    const handleSaveClick = (e) => {
        e.preventDefault()
    }

    const [review, setReview] = useState()
    const [stars, setStars] = useState()

    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)

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
            </div>
            </form>
        </section>
        </div>
    )
}

export default EditReview
