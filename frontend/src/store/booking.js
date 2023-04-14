import { normalize } from "./helperFunctions"
import { csrfFetch } from './csrf';

const LOAD_USER_BOOKINGS = '/bookings/loadUserBookings'
const LOAD_SPOT_BOOKINGS = '/bookings/loadSpotBookings'
const EDIT_BOOKING = '/bookings/editBooking'
const CREATE_BOOKING = '/bookings/createBooking'
const DELETE_BOOKING = '/bookings/deleteBooking'

//eventually add another action for adding images to an existing spot

const loadUserBookings = (data) => {
    return {
        type: LOAD_USER_BOOKINGS,
        data
    }
}

const loadSpotBookings = (data) => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        data
    }
}

const createBooking = (data) => {
    return {
        type: CREATE_BOOKING,
        data
    }
}

const deleteBooking = (data) => {
    return {
        type: DELETE_BOOKING,
        data
    }
}

const editBooking = (data) => {
    return {
        type: EDIT_BOOKING,
        data
    }
}


export const getUserBookings = () => async (dispatch) => {
    const res = await fetch(`/api/bookings/current`)
    if (res.ok) {
        const bookings = await res.json()
        dispatch(loadUserBookings(bookings))
    }
}


export const getSpotBookings = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if (res.ok) {
        const data = await res.json()
        dispatch(loadSpotBookings(data))
        return data
    }
}

export const newBooking = (booking) => async (dispatch) => {

    const res = await csrfFetch(`/api/spots/${booking.spotId}/bookings`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(booking)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(createBooking(data))
        return data
    }
}

export const updateBooking = (booking) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(booking)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(editBooking(data))
        return data
    }

}

export const removeBooking = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(deleteBooking(id))
        return data
    }
}



const initialState = {userBookings: {}, spotBookings: {}}

const bookingsReducer = (state = initialState, action) => {
    let newState = {userBookings: {}, spotBookings: {}}
    switch (action.type) {
        case LOAD_USER_BOOKINGS:
            newState.spotBookings = {...state.spotBookings}
            newState.userBookings = normalize(action.data.Bookings)
            return newState
        case LOAD_SPOT_BOOKINGS:
            newState.userBookings = {...state.userBookings}
            newState.spotBookings = normalize(action.data.Bookings)
            return newState
        case CREATE_BOOKING:
            newState = {...state}
            newState.spotBookings[action.data.id] = action.data
            newState.userBookings[action.data.id] = action.data
            return newState
        case EDIT_BOOKING:
            newState = {...state}
            newState.spotBookings[action.data.id] = action.data
            newState.userBookings[action.data.id] = action.data
            return newState
        case DELETE_BOOKING:
            newState = {...state}
            delete newState.spotBookings[action.data]
            delete newState.userBookings[action.data]
            return newState
    default:
        return state;
    }

}

export default bookingsReducer
