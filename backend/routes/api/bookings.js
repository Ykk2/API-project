const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { getUserBookings, updateBooking, deleteBooking } = require('./middleware/booking');

const router = express.Router();

//get all of the current user's bookings
router.get('/current', requireAuth, getUserBookings);

//edit a booking
router.put('/:bookingId', requireAuth, updateBooking);


//delete a booking
router.delete('/:bookingId', requireAuth, deleteBooking);


module.exports = router;
