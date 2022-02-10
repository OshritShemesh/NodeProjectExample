const Weather = require('../model/weather')
const request = require('request')
const User = require('../model/user')

const requestApiWeather = (country) => {
    return new Promise((resolve, reject) => {

        let options = {
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=8ebb62cfe26e74440028405e2aa70b69`
        }

        request(options, function (err, res, body) {
            if (err) {
                reject(err)
            }
            else
                resolve(body)
        });
    })
}

const addWeather = (req, res) => {
    //get the weather from the weatherApi
    requestApiWeather(req.params.country)
        .then(weatherData => {
            weatherData = JSON.parse(weatherData)

            //create the weather obj
            const newWeather = new Weather({
                country: weatherData.name,
                main: weatherData.weather[0].main,
                temp: weatherData.main.temp,
                wind: weatherData.wind,
                userId: req.params.id
            })
            newWeather.save()
                .then(savedWeather => {
                    //update the User collection
                    User.findByIdAndUpdate(req.params.id, { $push: { 'weathers': savedWeather._id } })
                        .then(() => {
                            console.log('weather saved to DB and to user')
                            res.status(200).send({ WeatherForUser: savedWeather })
                        })
                        .catch(err => res.status(400).send(err))
                })
                .catch(err => res.status(400).send(err))
        })
        .catch(err => res.status(400).send(err))
}

const removeWeatherById = (req, res) => {
    Weather.findByIdAndRemove(req.params.weatherId)
        .then(() => {
            User.findOneAndUpdate({ weathers: req.params.weatherId }, { $pull: { weathers: req.params.weatherId } })
                .then(res.status(200).send('the weather was removed.'))
                .catch(err => res.status(400).send(err))
        })
        .catch(err => res.status(400).send(err))
}

module.exports = { addWeather, removeWeatherById }