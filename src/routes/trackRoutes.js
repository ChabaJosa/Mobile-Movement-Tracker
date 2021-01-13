const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const Track = mongoose.model('Track')

const router = express.Router();

// Everything under this will make use of the requireAuth middleware
router.use(requireAuth)

// Gets all the tracks for the user ever
router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({userID : req.user._id})
    res.send(tracks)
})

// Posts new tracks
router.post('/tracks', async (req, res) => {
    const {name, locations} = req.body
    if (!name || !locations){
        return res.status(422).send({error: 'You must provide a name and locations'})
    }

    try{
        const track = new Track({name, locations, userID: req.user._id })
        await track.save()
        res.send(track)
    } catch (err) {
        res.status(422).send({error: err.message})
    }
    
})

module.exports = router;