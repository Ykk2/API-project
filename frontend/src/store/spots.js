import { normalize } from "./helperFunctions"

const LOAD_SPOTS = '/spots/loadSpots'
const LOAD_SPOT = '/spots/getSpot'
const EDIT_SPOT = '/spots/editSpot'
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

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            let newState = {}
            const response = action.data.Spots
            newState = normalize(response)
            return newState
    default:
        return state;
    }

}

export default spotsReducer
