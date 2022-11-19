const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Spot, sequelize } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { UniqueConstraintError } = require('sequelize');
const booking = require('../../db/models/booking');


const router = express.Router();


//get current user's spots
router.get('/current', requireAuth, async (req, res) => {

    const userId = req.user.id

    const spots = await Spot.findAll({

        where: { ownerId: userId },
        include: [{
            model: Review,
            as: 'Reviews',
            attributes: [],
            duplicating: false,
        }, {
            model: SpotImage,
            as: 'SpotImages',
            attributes: [],
            duplicating: false
        }],
        attributes: {
            include: [[sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            [sequelize.col('SpotImages.url'), 'previewImage']],
        },
        group: ['Spot.id', 'SpotImages.url'],
        order: [['id', 'ASC']],
    })
    return res.json({ "Spots": spots })
})


// get details by spotId
router.get('/:spotId', async (req, res) => {


    const { spotId } = req.params

    const spot = await Spot.findOne({
        where: { id: spotId },
        include: [{
            model: Review,
            as: 'Reviews',
            attributes: [],
            duplicating: false,
        }, {
            model: SpotImage,
            as: 'SpotImages',
            attributes: ['id', 'url', 'preview'],
            duplicating: false
        }, {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName'],
        }],
        attributes: {
            include: [[sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
                      [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating']]

        },
        group: ['Spot.id', 'SpotImages.id', 'Owner.id'],
    })

    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    return res.json(spot)
})


//get all spots
router.get('/', async (req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query


    // let query = { where: {}, }
    let err = {}

    if (parseInt(page) <= 0 || parseInt(size) <= 0) {
        if (parseInt(page) <= 0) {
            err.page = "Page must be greater than or equal to 1"
        }

        if (parseInt(size) <= 0) {
            err.size = "Size must be greater than or equal to 1"
        }
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: err
        })
    }

    // if (maxLat.check())

    if (!page) page = 1
    if (!size) size = 20

    let pagination = {}
    if (parseInt(page) >= 1 && parseInt(size) >= 1) {
        pagination.limit = +size;
        pagination.offset = +size * (+page - 1)
    }



    const spots = await Spot.findAll({

        include: [{
            model: Review,
            as: 'Reviews',
            attributes: [],
            duplicating: false,
        }, {
            model: SpotImage,
            as: 'SpotImages',
            attributes: [],
            duplicating: false
        }],
        attributes: {
            include: [[sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            [sequelize.col('SpotImages.url'), 'previewImage']],
        },
        group: ['Spot.id', 'SpotImages.url'],
        order: [['id', 'ASC']],
        ...pagination
    })

    return res.json({ "Spots": spots, page, size })
})


//add an image to a spot

router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    const { spotId } = req.params
    const { url, preview } = req.body

    const spot = await Spot.findByPk(spotId)
    const err = {message: ["Spot couldn't be found"], errors: []}

    if (!spot) {
        err.errors.push("Spot couldn't be found")
        err.status = 404
        return next(err)
    }


    const image = await SpotImage.create({ spotId, url, preview })
    const spotImage = await SpotImage.findOne({
        where: { id: image.id }
    })
    return res.json(spotImage)
})


//create a spot

router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {

        const err = {message: ["Validation Error"], errors: []}

        if (!address) {
            err.errors.push("Streetaddress is required")
        }
        if (!city) {
            err.errors.push("City is required")
        }
        if (!state) {
            err.errors.push("State is required")
        }
        if (!country) {
            err.errors.push("Country is required")
        }
        if (!lat) {
            err.errors.push("Latitude is not valid")
        }
        if (!lng) {
            err.errors.push("Longitude is not valid")
        }
        if (!name) {
            err.errors.push("Name must be less than 50 characters")
        }
        if (!description) {
            err.errors.push("Description is required")
        }
        if (!price) {
            err.errors.push("Price per day is required")
        }
        err.status = 400
        return next(err)
    }

    const ownerId = req.user.id
    const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price })
    return res.json(spot)

})


//edit a spot

router.put('/:spotId', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)


    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const userId = req.user.id
    const ownerId = spot.ownerId

    if (userId !== ownerId) {
        return res.json({
            message: "You don't own this spot",
            statusCode: 404
        })
    }

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        const err = {}

        if (!address) {
            err.address = "Street address is required"
        }
        if (!city) {
            err.city = "City is required"
        }
        if (!state) {
            err.state = "State is required"
        }
        if (!country) {
            err.country = "Country is required"
        }
        if (!lat) {
            err.lat = "Latitude is not valid"
        }
        if (!lng) {
            err.lng = "Longitude is not valid"
        }
        if (!name) {
            err.name = "Name must be less than 50 characters"
        }
        if (!description) {
            err.description = "Description is required"
        }
        if (!price) {
            err.price = "Price per day is required"
        }

        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: err
        })
    }


    await spot.update({ address, city, state, country, lat, lng, name, description, price })
    await spot.save()

    return res.json(spot)
})


//delete a spot

router.delete('/:spotId', requireAuth, async (req, res) => {

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const userId = req.user.id
    const ownerId = spot.ownerId

    if (userId !== ownerId) {
        return res.json({
            message: "You don't own this spot",
            statusCode: 404
        })
    }

    await spot.destroy()

    return res.json({
        message: "Succesfully deleted",
        statusCode: 200
    })
})


//get all reviews by spotId authenticate false
router.get('/:spotId/reviews', async (req, res) => {

    let result = []

    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const reviews = await Review.findAll({ where: { spotId: spotId } })

    for (let i = 0; i < reviews.length; i++) {
        let review = reviews[i].toJSON()
        let userId = reviews[i].toJSON().userId

        let userInfo = await User.findOne({
            where: { id: userId },
            attributes: {
                exclude: ['username']
            }
        })
        review.User = userInfo

        let reviewId = reviews[i].toJSON().id

        let images = await ReviewImage.findAll({
            where: { reviewId: reviewId }
        })
        review.ReviewImages = images

        result.push(review)
    }

    return res.json({ Reviews: result })

})


//create a review for a spot based on spotId
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const spotId = Number(req.params.spotId)
    const userId = req.user.id
    if (!review || !stars) {
        const err = {}
        if (!review) {
            err.review = "Review text is required"
        }
        if (!stars) {
            err.stars = "Stars must be an integer from 1 to 5"
        }
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: err
        })
    }

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const reviewExists = await Review.findOne({
        where: {
            userId: userId,
            spotId: spotId
        }
    })


    if (reviewExists) {
        return res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }


    const newReview = await Review.create({ spotId, userId, review, stars })
    return res.json(newReview)
})


//get all bookings for a spot

router.get('/:spotId/bookings', requireAuth, async (req, res) => {

    const userId = req.user.id
    const { spotId } = req.params

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if (spot.ownerId === userId) {

        let result = []

        const bookings = await Booking.findAll({ where: { userId: userId } })

        for (let i = 0; i < bookings.length; i++) {
            let booking = bookings[i].toJSON()
            let customer = await User.findOne({ where: { id: booking.userId }, attributes: { include: ['id', 'firstName', 'lastName'] } })
            booking.User = customer
            result.push(booking)
        }
        return res.json({ "Bookings": result })
    }

    if (spot.ownerId !== userId) {
        const bookings = await Booking.findAll({ where: { userId: userId }, attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] } })
        return res.json({ "Bookings": bookings })
    }
})

//create a booking from a spot based on the spot

router.post('/:spotId/bookings', requireAuth, async (req, res) => {

    const userId = req.user.id
    const { startDate, endDate } = req.body
    const { spotId } = req.params

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const ownerId = spot.ownerId

    if (endDate <= startDate) {
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot be on or before starDate"
            }
        })
    }

    if (userId === ownerId) {
        return res.json({
            message: "can't book your own spot bro"
        })
    }


    if (userId !== ownerId) {

        const existingBookings = await Booking.findAll({ where: { spotId: spotId } })

        for (let i = 0; i < existingBookings.length; i++) {

            let existingBooking = existingBookings[i].toJSON()
            let err = {}

            if (existingBooking.endDate.getTime() == new Date(endDate).getTime() ||
                existingBooking.startDate.getTime() == new Date(startDate).getTime()) {

                if (existingBooking.endDate.getTime() == new Date(endDate).getTime()) {
                    err.endDate = "End date conflicts with an existing booking"
                }
                if (existingBooking.startDate.getTime() == new Date(startDate).getTime()) {
                    err.startDate = "Start date conflicts with an existing booking"
                }
                return res.json({
                    messaage: "Sorry, this spot is already booked for the specified dates",
                    statusCode: "403",
                    errors: err
                })
            }
        }

        const newBooking = await Booking.create({ spotId, userId, startDate, endDate })
        return res.json(newBooking)
    }
})




module.exports = router;
