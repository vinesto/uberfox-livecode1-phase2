const mongoose = require('mongoose')
const Schema = mongoose.Schema

var itemSchema = new Schema({
    name: String,
    price: Number,
    stock: Number,
    tags:String,
    user:{
        ref:'User',
        type: Schema.Types.ObjectId
    }
},{
    timestamps:true
})

var item = mongoose.model('Item',itemSchema)

module.exports = item