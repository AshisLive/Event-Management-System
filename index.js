const express = require("express")
const route = require("./src/routes/route")
const mongoose = require("mongoose")

const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/eventManagmentSystemDB", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

    app.use(multer().any())
    app.use('/', route)
    
    app.listen(process.env.Port || 3000, function() {
        console.log('express port running on port ' + (process.env.Port || 3000))
    })