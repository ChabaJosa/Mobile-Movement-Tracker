require('./models/User')
require('./models/Track')
// ^ Get called at least once
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const colors = require('colors')

const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express();

// Parses json of body property from incoming reqs before passing it to the req handlers
app.use(bodyParser.json());
// Associates all req handlers from the router with our main express App
app.use(authRoutes); 
app.use(trackRoutes)

const mongoUri = 'mongodb+srv://MovementTrk:Fsociety2021@cluster0.z4ouw.mongodb.net/MovementTrk?retryWrites=true&w=majority'
// Connects to mongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true 
})
// Checks when connected
mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo!'.yellow)
})
// Checks on error
mongoose.connection.on('error', (err) => {
    console.log('Ugly error incoming!'.brightRed.bold, err)
})
// Landing request on localhost:3000 or whichever port
// requireAuth checks users
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is: ${req.user.email}`)
});

app.listen(3000, () => {
    console.log('Listening on port 3000'.cyan.underline)
})