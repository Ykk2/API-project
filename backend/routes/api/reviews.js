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

    const userId = 1

    const reviews = await Review.findAll({

        where: { userId: userId },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }, {
            model: Spot,
            required: true,
            include: [{
                model: SpotImage,
                as: 'SpotImages',
                where: { preview: true },
                attributes: ['url'],
                duplicating: false,
            }],
            // attributes: {
            //     include: [[sequelize.col('SpotImages.url'), 'previewImage']]
            // },
        }, {
            model: ReviewImage,
            as: 'ReviewImages',
            attributes: ['id', 'url']
        }],
    })
    return res.json({ "Reviews": reviews })

})


//add an image to a review
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const { url } = req.body

    const reviewExists = await Review.findByPk(reviewId)

    if (!reviewExists) {
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    const review = await Review.findAll({
        where: { id: reviewId },
        include: {
            model: ReviewImage,
            as: 'ReviewImages',
            attributes:[],
            duplicating: false,
            required: true
        },
        attributes: {
            include: [[sequelize.fn('COUNT', sequelize.col('ReviewImages.id')), 'count'], 'Review.id']
        },
        group: ['Review.id'],
        raw: true
    })


    const reviewImagesCount = JSON.parse(JSON.stringify(review)).count


    if (parseInt(reviewImagesCount) >= 10) {
        res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }

    const reviewImage = await ReviewImage.create({ reviewId, url })

    return res.json({ id: reviewImage.id, url: reviewImage.url })
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
