const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Spot, sequelize } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const jwt = require('jsonwebtoken')

const router = express.Router();


//get current user's spots
router.get('/current', async (req, res) =>{

    // const { token } = req.cookies
    // const user = jwt.decode(token).data

    const userId = req.user.id
    console.log("hello")
    let result = []

    const spots = await Spot.findAll({
        where: {ownerId: userId}
    })

    for (let i = 0; i < spots.length; i++) {

        let spot = spots[i].toJSON()

        const avgRating = await Review.findAll({
            where: {spotId: spot.id},
            attributes: {
                include: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
            }
        })
        spot.avgRating = avgRating[0].toJSON().avgRating

        const previewImage = await SpotImage.findAll({
            where: {spotId: spot.id, preview: true},
            attributes: ['url']
        })
        spot.previewImage = previewImage[0].toJSON().url

        result.push(spot)
    }

    return res.json({ "Spots": result })
})


//get details by spotId
router.get('/:spotId', async (req, res) => {

    const {spotId} = req.params

    const spot = await Spot.findAll({
        where: {id: spotId}
    })

    const reviewData = await Review.findAll({
        where: {spotId: spotId},
        attributes: {
            include: [[sequelize.fn('COUNT', sequelize.col('stars')), 'numReviews'],
                      [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']]
        }
    })

    spot.numReviews = reviewData[0].toJSON().numReviews
    spot.avgStarRating = reviewData[0].toJSON().avgStarRating

    const

    return res.json(spot)
})


//get all spots
router.get('/', async (req, res) => {

    let result = []

    const spots = await Spot.findAll()

    for (let i = 0; i < spots.length; i++) {

        let spot = spots[i].toJSON()

        const avgRating = await Review.findAll({
            where: {spotId: spot.id},
            attributes: {
                include: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
            }
        })
        spot.avgRating = avgRating[0].toJSON().avgRating

        const previewImage = await SpotImage.findAll({
            where: {spotId: spot.id, preview: true},
            attributes: ['url']
        })
        spot.previewImage = previewImage[0].toJSON().url

        result.push(spot)
    }

    return res.json({ "Spots": result })
})

module.exports = router;
