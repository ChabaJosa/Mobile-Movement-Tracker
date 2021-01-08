const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
    const {authorization} = req.headers
    // authorization === 'Bearer dhgkjhfksdjfhkf'

    if (!authorization) { // Issue here
        return res.status(401).send({error: 'You must be logged in.'})
    }

    const token = authorization.replace('Bearer ', '') // Leaves us with just the token
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload ) => {
        if (err) {
            return res.status(401).send({error: 'You must be logged in.'})    
        }
        // If not, then the user provided a legitimate token
        const {userID} = payload;

        const user = await User.findById(userID)
        req.user = user;
        next(); // Middleware done, on the next one
    })

} 