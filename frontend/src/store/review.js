import { normalize } from "./helperFunctions"
import { csrfFetch } from './csrf';
import {updateStarRating} from './spots.js'

const LOAD_REVIEWS = '/reviews/loadReviews'
const EDIT_REVIEW = '/reviews/editReview'
const CREATE_REVIEW = '/reviews/createReview'
const DELETE_REVIEW = '/reviews/deleteReview'



const loadReviews = (data) => {
    return {
        type: LOAD_REVIEWS,
        data
    }
}

const createReview = (data) => {
    return {
        type: CREATE_REVIEW,
        data
    }
}

const deleteReview = (data) => {
    return {
        type: DELETE_REVIEW,
        data
    }
}

const editReview = (data) => {
    return {
        type: EDIT_REVIEW,
        data
    }
}

export const getReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
        const data = await res.json()
        dispatch(loadReviews(data))
        return data
    }
}


export const newReview = (spotId, data, user) => async (dispatch) => {

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })


    if (res.ok) {
        const review = await res.json()
        review.User = user
        dispatch(createReview(review))
        return review
    }
}

export const updateReview = (reviewId, data, user) => async (dispatch) => {

    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
            'ContentType': "application/json"
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {

        const review = await res.json()
        review.User = user
        dispatch(editReview(review))
        return review
    }

}

export const removeReview = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {

        const response = await res.json()
        dispatch(deleteReview(id))
        return response
    }
}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = normalize(action.data.Reviews)
            return newState
        case CREATE_REVIEW:
            newState = {...state}
            newState[action.data.id] = action.data
            return newState
        case EDIT_REVIEW:
            newState = {...state}
            newState[action.data.id] = action.data
            return newState
        case DELETE_REVIEW:
            newState = {...state}
            delete newState[action.data]
            return newState
    default:
        return state;
    }

}

export default reviewsReducer
