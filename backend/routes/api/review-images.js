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



//delete an existing image for a review authentication true review must belong to current user

router.delete('/:imageId', requireAuth, async (req, res) => {

    const {imageId} = req.params
    const userId = req.user.id

    const reviewImage = await ReviewImage.findByPk(imageId)

    if (!reviewImage) {
        return res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }

    const reviewId = reviewImage.toJSON().reviewId

    const review = await Review.findByPk(reviewId)

    const spotId = review.toJSON().spotId

    const spot = await Spot.findByPk(spotId)

    const reviewUserId = review.toJSON().userId


    if (userId !== reviewUserId) {
        res.json({
            message: "You are not the owner of this review"
        })
    }

    reviewImage.destroy()

    return res.json({
        message: "Succesfully deleted",
        statusCode: 200
    })
})




module.exports = router;
