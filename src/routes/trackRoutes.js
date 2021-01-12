const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const Track = mongoose.model('Track')

const router = express.Router();

router.use(requireAuth)
// Everything under this will make use of the requireAuth middleware

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({userID : req.user._id})
    // Gets all the tracks for the user ever

    res.send(tracks)
})

module.exports = router;