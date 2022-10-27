const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Spot, sequelize } = require('../../db/models');
const { Review, ReviewImage } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//get all reviews from current user authenticate true
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


//add an image to a review based on reviewid authenticate true
router.post('/:reviewId/images')


//edit a review authenticate true
router.put('/:reviewId')


//delete a review authenticate true

router.delete(':/reviewId')


module.exports = router;
