const mongoose = require('mongoose')

const WeatherScheme = mongoose.Schema({
    country: { type: String },
    main: { type: String },
    temp: { type: Number },
    wind: {
        speed: { type: Number },
        deg: { type: Number },
        gust: { type: Number }
    },
    userId: {//whoes admin is this
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('Weather', WeatherScheme)