const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: 'First name is required',
        trim: true,
    },
    lname: {
        type: String,
        required: 'Last name is required',
        trim: true,
    },
    gender: {
        type: String,
        required: 'Gender is required',
        trim: true,
    },
    email: {
        type: String,
        required: 'email is required',
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: 'Password is required'
    }
}, { timestamps: true })

module.exports = mongoose.model('user',userSchema)