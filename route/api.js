const router = require('express').Router()
const admin = require('../controller/admin')
const user = require('../controller/user')
const weather = require('../controller/weather')

//admin
router.post('/addAdmin', admin.addAdmin)
router.get('/getUsersForAdmin/:adminId', admin.getUsersForAdmin)

//user
router.post('/addUser', user.addUser)
router.get('/getWeathersForUserId/:id', user.getWeathersForUserId)
router.delete('/removeUserById/:userId', user.removeUserById)
router.get('/loginUserOrAdmin', user.loginUserOrAdmin)
//to connect to the react (we also add a middleware in the App.js)
router.get('/helloWorld', user.helloWorld)

//weather
router.get('/addWeather/:id/:country', weather.addWeather)
router.delete('/removeWeatherById/:weatherId', weather.removeWeatherById)

//user
// router.patch('/userByIdAndUpdate/:id', user.userByIdAndUpdate)
// router.get('/userByAge', user.userByAge)

module.exports = router