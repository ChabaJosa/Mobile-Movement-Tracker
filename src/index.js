const express = require('express')
const mongoose = require('mongoose')
const colors = require('colors')
const app = express();

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
app.get('/', (req, res) => {
    res.send('Hi there!')
});

app.listen(3000, () => {
    console.log('Listening on port 3000'.cyan.underline)
})