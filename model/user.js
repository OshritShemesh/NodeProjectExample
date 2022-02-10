const mongoose = require('mongoose')

const UserScheme = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        minLength: 6
    },
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        minLength: 4
    },
    adminId: {//whoes admin is this
        type: mongoose.Types.ObjectId,
        ref: 'Admin'
    },
    weathers: [//every Admin can have couple of users under him
        {
            type: mongoose.Types.ObjectId,
            ref: 'Weather'
        }
    ]
})

module.exports = mongoose.model('User', UserScheme)