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
    const {bookingId} = req.params
    const {startDate, endDate} = req.body

    const currentBooking = await Booking.findByPk(bookingId)

    const bookingOwnerId = currentBooking.toJSON().userId

    if (!currentBooking) {
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    if (startDate <= Date.now())

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
                endDate: "endDate cannot be on or before starDate"
            }
        })
    }

    currentBooking.update({startDate, endDate})
    currentBooking.save()
    return res.json(currentBooking)
})

//delete a booking

router.delete('/:bookingId')


module.exports = router;
