const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Spot, sequelize } = require('../../db/models');
const { Review, ReviewImage } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');

const router = express.Router();

//get all reviews from current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    let result = []


    const reviews = await Review.findAll({ where: { userId: userId } })

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


        let spot = await Spot.findOne({
            where: {id: review.spotId}
        })
        let previewImages = await SpotImage.findAll({
            where: { spotId: review.spotId, preview: true },
            attributes: ['url']
        })

        let reviewSpot = spot.toJSON()
        let previewImage = previewImages[0].toJSON().url
        reviewSpot.previewImage = previewImage
        review.Spot = reviewSpot


        let reviewId = reviews[i].toJSON().id

        let images = await ReviewImage.findAll({
            where: { reviewId: reviewId }
        })
        review.ReviewImages = images

        result.push(review)
    }

    return res.json({ Reviews: result })

})


//add an image to a review
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const { url } = req.body

    const reviewExists = await Review.findOne({where: { id: reviewId }})

    if (!reviewExists) {
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    const reviewImages = await ReviewImage.findAll({
        where: {reviewId: reviewId},
        attributes: {
            include: [[sequelize.fn('COUNT', sequelize.col('url')), 'count']]
        },
        group: ['ReviewImage.id']
    })

    const reviewImagesCount = reviewImages[0].toJSON().count

    if (reviewImagesCount >= 10) {
        res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }


    const reviewImage = await ReviewImage.create({ reviewId, url })

    return res.json({id: reviewImage.toJSON().id, url: reviewImage.toJSON().url})
})


//edit a review authenticate true
router.put('/:reviewId', requireAuth, async (req, res) => {

    const {review, stars} = req.body
    const {reviewId} = req.params

    const currentReview = await Review.findByPk(reviewId)

    if (!currentReview) {
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }


    if (!review || !stars) {
        const err = {}

        if (!review) {
            err.review = "Review text is required"
        }

        if(!stars) {
            err.stars = "Stars must be an integer from 1 to 5"
        }

        return res.json({
            message: 'Validation error',
            statusCode: '400',
            errors: err
        })
    }

    await currentReview.update({review, stars})
    await currentReview.save()
    return res.json(currentReview)
})


//delete a review authenticate true

router.delete('/:reviewId', requireAuth, async (req, res) => {

    const {reviewId} = req.params

    const currentReview = await Review.findByPk(reviewId)

    if (!currentReview) {
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    await currentReview.destroy()
    return res.json({
        message: 'Succesfully deleted',
        statusCode: 200
    })
})


module.exports = router;
