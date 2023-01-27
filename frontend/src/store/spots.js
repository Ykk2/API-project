import { normalize } from "./helperFunctions"
import { csrfFetch } from './csrf';

const LOAD_SPOTS = '/spots/loadSpots'
const LOAD_SPOT = '/spots/getSpot'
const EDIT_SPOT = '/spots/editSpot'
const CREATE_SPOT = '/spots/createSpot'
const DELETE_SPOT = '/spots/deleteSpot'
const ADD_IMAGE = '/spots/addSpotImage'
const UPDATE_RATING = '/spots/updateStarRating'

//eventually add another action for adding images to an existing spot

const loadSpots = (data) => {
    return {
        type: LOAD_SPOTS,
        data
    }
}

const loadSpot = (data) => {
    return {
        type: LOAD_SPOT,
        data
    }
}

const createSpot = (data) => {
    return {
        type: CREATE_SPOT,
        data
    }
}

const deleteSpot = (data) => {
    return {
        type: DELETE_SPOT,
        data
    }
}

const editSpot = (data) => {
    return {
        type: EDIT_SPOT,
        data
    }
}

const addImage = (data) => {
    return {
        type: ADD_IMAGE,
        data
    }
}

const updateRating = (spotId, avgRating) => {
    return {
        type: UPDATE_RATING,
        spotId,
        avgRating
    }
}

export const updateStarRating = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)
    if (res.ok) {
        const spot = await res.json()
        const avgRating = spot.avgStarRating
        dispatch(updateRating(spotId, avgRating))
        return avgRating
    }
}


export const getSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots')
    if (res.ok) {
        const data = await res.json()
        dispatch(loadSpots(data))
        return data
    }
}

export const getSpot = (id) => async (dispatch) => {
    const res = await fetch(`/api/spots/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(loadSpot(data))
        return data
    }
}

export const newSpot = (data) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const spot = await res.json()
        dispatch(createSpot(spot))
        return spot
    }
}

export const updateSpot = (spotId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(editSpot(data))
        return data
    }

}

export const removeSpot = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const response = await res.json()
        dispatch(deleteSpot(response))
        return response
    }
}

export const addSpotImage = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${data.spotId}/images`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addImage(data))
        return data
    }
}

const initialState = {spots: {}, spot: {}}

const spotsReducer = (state = initialState, action) => {
    let newState = {spots: {}, spot: {}}
    switch (action.type) {
        case LOAD_SPOTS:
            newState.spots = normalize(action.data.Spots)
            return newState
        case LOAD_SPOT:
            newState.spot = action.data
            newState.spots = {...state.spots}
            return newState
        case CREATE_SPOT:
            newState.spots = {...state.spots}
            newState.spots[action.data.id] = action.data
            newState.spot = action.data
            return newState
        case EDIT_SPOT:
            newState.spots = {...state.spots}
            newState.spots[action.data.spotId] = action.data
            newState.spot = action.data
            newState.spot.SpotImages = state.spot.SpotImages
            return newState
        case DELETE_SPOT:
            newState = {...state}
            delete newState[action.data.id]
            return newState
        case ADD_IMAGE:
            newState = {...state}
            newState.spot.SpotImages = []
            newState.spot.SpotImages.push(action.data)
            return newState
        case UPDATE_RATING:
            newState = {...state}
            newState.spot.avgStarRating = action.avgRating
            return newState
    default:
        return state;
    }

}

export default spotsReducer
