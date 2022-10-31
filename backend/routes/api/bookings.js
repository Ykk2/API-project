const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Spot, sequelize } = require('../../db/models');
const { Review, ReviewImage, Booking } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');

const router = express.Router();

//get all of the current user's bookings

router.get('/current', requireAuth, async (req, res) => {

    let result = []

    const userId = req.user.id

    const bookings = await Booking.findAll({
        where: { userId: userId }
    })

    for (let i = 0; i < bookings.length; i++) {

        let booking = bookings[i].toJSON()

        let spotId = bookings[i].toJSON().spotId

        let spot = await Spot.findByPk(spotId)

        const previewImage = await SpotImage.findAll({
            where: { spotId: spot.id, preview: true },
            attributes: ['url']
        })
        spot.previewImage = previewImage[0].toJSON().url

        booking.Spot = spot
        result.push(booking)
    }

    return res.json({ "Bookings": result })

})


//edit a booking

router.put('/:bookingId', requireAuth, async (req, res) => {

    const userId = req.user.id
    const { bookingId } = req.params
    const { startDate, endDate } = req.body

    const currentBooking = await Booking.findByPk(bookingId)

    const bookingOwnerId = currentBooking.toJSON().userId


    if (!currentBooking) {
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    // if (startDate <= Date.now())

    if (userId !== bookingOwnerId) {
        res.json({
            message: "You don't own this booking bro"
        })
    }

    if (endDate <= startDate) {
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }

    if (currentBooking.endDate.getTime() < new Date(Date.now()).getTime()) {
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }

    let err = {}

    if (currentBooking.endDate.getTime() == new Date(endDate).getTime() ||
        currentBooking.startDate.getTime() == new Date(startDate).getTime()) {

        if (currentBooking.endDate.getTime() == new Date(endDate).getTime()) {
            err.endDate = "End date conflicts with an existing booking"
        }
        if (currentBooking.startDate.getTime() == new Date(startDate).getTime()) {
            err.startDate = "Start date conflicts with an existing booking"
        }
        return res.json({
            messaage: "Sorry, this spot is already booked for the specified dates",
            statusCode: "403",
            errors: err
        })
    }


    currentBooking.update({ startDate, endDate })
    currentBooking.save()
    return res.json(currentBooking)
})

//delete a booking

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params
    const userId = req.user.id
    const booking = await Booking.findByPk(bookingId)


    if (!booking) {
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    const spotId = booking.spotId
    const bookedUserId = booking.userId
    const spot = await Spot.findByPk(spotId)
    const ownerId = spot.ownerId
    const startDate = booking.startDate
    const endDate = booking.endDate

    if (userId !== bookedUserId && userId !== ownerId) {
        return res.json({
            message: "Only the owner of the spot or the booking can delete bookings"
        })
    }

    if (new Date(startDate).getTime() < new Date(Date.now()).getTime()) {
        return res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        })
    }

    await booking.destroy()

    return res.json({
        message: "Succesfully deleted",
        statusCode: 200
    })
})


module.exports = router;
