const Admin = require('../model/admin')
const User = require('../model/user')
const Sendmail = require('./sendMail')
const jwt = require('jsonwebtoken')

const addAdmin = (req, res) => {
    const newAdmin = new Admin(req.body)
    newAdmin.save().then(savedAdmin => {

        //send email to the new admin
        Sendmail.sendmail(savedAdmin.email, savedAdmin.name)
            .then(data => console.log(data)).catch(err => console.log(err))//for the resolve & reject

        //getting the token of the new admin
        const token = jwt.sign({ name: savedAdmin.userName, password: savedAdmin.password }, process.env.SECRET/*the type of הצפנה*/)
        console.log(`the admin token: ${token}`)

        //the new admin
        res.status(200).json({ NewAdmin: savedAdmin })

    }).catch(err => {
        res.status(400).send(err)
    })
}

const getUsersForAdmin = (req, res) => {
    Admin.findById(req.params.adminId).populate({ path: 'users', select: 'name userName email' })
        .then(users => res.status(200).send({ adminUsers: users }))
        .catch(err => res.status(400).send(err))

    //without populate
    // User.find({ adminId: req.params.adminId }).select('name userName email')
    //     .then(users => res.status(200).send({ adminUsers: users }))
    //     .catch(err => res.status(400).send(err))
}

module.exports = { addAdmin, getUsersForAdmin }