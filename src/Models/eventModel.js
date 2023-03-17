const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'title is required',
        trim: true,
    },
    description: {
        type: String,
        required: 'description is required',
        trim: true,
    },
    date: {
        type: Date,
        required: 'Date is required',
        trim: true,
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        required: 'users are required',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: 'Createdby is required'
    }
}, { timestamps: true })

module.exports = mongoose.model('event',eventSchema)