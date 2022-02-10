const User = require('../model/user')
const Admin = require('../model/admin')
const Weather = require('../model/weather')
const Sendmail = require('./sendMail')
const jwt = require('jsonwebtoken')

const addUser = (req, res) => {
    const newUser = new User(req.body)
    newUser.save().then(savedUser => {

        //add userId to the admin
        Admin.findByIdAndUpdate(req.body.adminId, { $push: { 'users': savedUser._id } })
            .then(console.log('user saved to admin'))
            .catch(err => { console.log(err); })

        //send email to the new user
        Sendmail.sendmail(savedUser.email, savedUser.name)
            .then(data => console.log(data)).catch(err => console.log(err))//for the resolve & reject

        //getting the token of the new user
        const token = jwt.sign({ name: savedUser.userName, password: savedUser.password }, process.env.SECRET/*the type of הצפנה*/)
        console.log(`the user token: ${token}`)

        //the new user
        res.status(200).json({ NewUser: savedUser })

    }).catch(err => {
        res.status(400).send(err)
    })
}

const getWeathersForUserId = (req, res) => {
    Weather.find({ userId: req.params.id }).select('country main temp wind')//.populate({ path: 'weathers', select: 'temp wind' })
        .then(weathers => res.status(200).json({ weathersForUser: weathers }))
        .catch(err => res.status(400).send(err))
}

const removeUserById = (req, res) => {
    Weather.remove({ userId: req.params.userId })
        .then(console.log('the weathers of the user, were removed.'))
        .catch(err => console.log(err))
    Admin.findOneAndUpdate({ users: req.params.userId }, { $pull: { users: req.params.userId } })
        .then(console.log('the user was removed from the admin.'))
        .catch(err => console.log(err))
    User.findByIdAndRemove(req.params.userId)
        .then(res.status(200).send('the user was removed totally!'))
        .catch(err => res.status(400).send(err))
}

const loginUserOrAdmin = (req, res) => {
    try {
        const token = jwt.sign({ name: req.body.userName, password: req.body.password }, process.env.SECRET)
        res.status(200).send(token)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

//func that connects to react
const helloWorld = (req, res) => {
    res.send('hello World from node');
}

module.exports = { addUser, getWeathersForUserId, removeUserById, loginUserOrAdmin, helloWorld }