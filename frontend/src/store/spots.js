import { normalize } from "./helperFunctions"
import { csrfFetch } from './csrf';

const LOAD_SPOTS = '/spots/loadSpots'
const LOAD_SPOT = '/spots/getSpot'
const EDIT_SPOT = '/spots/editSpot'
const CREATE_SPOT = '/spots/createSpot'
const DELETE_SPOT = '/spots/deleteSpot'

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

export const getSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots')
    if (res.ok) {
        const data = await res.json()
        dispatch(loadSpots(data))
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

export const updateSpot = () => async (dispatch) => {

}

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_SPOTS:
            newState = normalize(action.data.Spots)
            return newState
        case CREATE_SPOT:
            console.log(action.type)
            newState = {...state}
            newState[action.data.id] = action.data
            return newState
    default:
        return state;
    }

}

export default spotsReducer
