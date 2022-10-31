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


//delete a spot image require auth spot must belong to current user

router.delete('/:imageId', requireAuth, async (req, res) => {

    const {imageId} = req.params
    const userId = req.user.id

    const spotImage = await SpotImage.findByPk(imageId)

    if (!spotImage) {
        return res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    }

    const spotId = spotImage.toJSON().spotId

    const spot = await Spot.findByPk(spotId)
    const ownerId = spot.toJSON().ownerId


    if (userId !== ownerId) {
        res.json({
            message: "You are not the owner of this spot"
        })
    }

    spotImage.destroy()

    return res.json({
        message: "Succesfully deleted",
        statusCode: 200
    })
})




module.exports = router;
