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

    // const { token } = req.cookies
    // const user = jwt.decode(token).data

    const userId = req.user.id
    let result = []

    const spots = await Spot.findAll({
        where: { ownerId: userId }
    })

    for (let i = 0; i < spots.length; i++) {

        let spot = spots[i].toJSON()

        const avgRating = await Review.findAll({
            where: { spotId: spot.id },

            attributes: {
                include:[[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
            },
            group:["stars"]
        })
        spot.avgRating = avgRating[0].toJSON().avgRating

        const previewImage = await SpotImage.findAll({
            where: { spotId: spot.id, preview: true },
            attributes: ['url']
        })
        spot.previewImage = previewImage[0].toJSON().url

        result.push(spot)
    }

    return res.json({ "Spots": result })
})


// get details by spotId
router.get('/:spotId', async (req, res) => {


    const { spotId } = req.params

    const spot = await Spot.findOne({
        where: { id: spotId }
    })

    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }


    let result;
    result = spot.toJSON()


    const reviewData = await Review.findAll({
        where: { spotId: spotId },
        attributes: {
            include:[[sequelize.fn('COUNT', sequelize.col('stars')), 'numReviews'],
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']]
        }
    })
    result.numReviews = reviewData[0].toJSON().numReviews
    result.avgStarRating = reviewData[0].toJSON().avgStarRating



    const spotImages = await SpotImage.findAll({
        where: { spotId: spotId },
        attributes: ['id', 'url', 'preview']
    })
    let spotImageArray = []
    for (let i = 0; i < spotImages.length; i++) {
        spotImageArray.push(spotImages[i].toJSON())
    }
    result.SpotImages = spotImageArray



    const owner = await User.findOne({
        where: { id: spot.ownerId },
        attributes: ['id', 'firstName', 'lastName']
    })
    result.Owner = owner


    return res.json(result)
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
        pagination.limit = size;
        pagination.offset = size * (page -1)
    }



    let result = []

    const spots = await Spot.findAll()

    for (let i = 0; i < spots.length; i++) {

        let spot = spots[i].toJSON()

        const avgRating = await Review.findAll({
            where: { spotId: spot.id },
            attributes: {
                include:[[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
            },
            group:['Review.id']
        })

        spot.avgRating = avgRating

        const previewImage = await SpotImage.findAll({
            where: { spotId: spot.id, preview: true },
            attributes: ['url']
        })


        if (previewImage) {
            spot.previewImage = previewImage
        }

        result.push(spot)
    }

    return res.json({ "Spots": result, page, size})
})


//add an image to a spot

router.post('/:spotId/images', requireAuth, async (req, res) => {

    const { spotId } = req.params
    const { url, preview } = req.body

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }


    const image = await SpotImage.create({ spotId, url, preview })
    const spotImage = await SpotImage.findOne({
        where: { id: image.id }
    })
    return res.json(spotImage)
})


//create a spot

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

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
