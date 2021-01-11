const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
})

const trackSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User' 
        // User specifically by mongoose that points to an instance of a User (Schema)
    },
    name: {
        type: String,
        default: ''
    },
    locations: [pointSchema]
    
}) 

mongoose.model('Track', trackSchema)
// We only load track becuase point Schema is only used within Track