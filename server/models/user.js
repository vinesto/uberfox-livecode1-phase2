const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
    username: String,
    password: String
},{
    timestamps:true
})

var user = mongoose.model('User',userSchema)

module.exports = user