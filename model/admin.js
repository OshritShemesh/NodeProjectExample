const mongoose = require('mongoose')

const AdminScheme = mongoose.Schema({
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
    users: [//every Admin can have couple of users under him
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
})

//middleware for schema

//before 'save' happens
AdminScheme.pre('save', (next) => {
    console.log('(schema middleware) going to save admin... :)');
    // console.log(this);//the obj that i did the 'save' on
    next()
})

//after 'save' happens
AdminScheme.post('save', (newAdmin, next) => {
    console.log('(schema middleware) saved nicely! :)');
    // console.log(`new admin id: ${newAdmin._id}`);
    next()
})

module.exports = mongoose.model('Admin', AdminScheme)